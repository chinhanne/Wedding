'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    addDoc,
    collection,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    startAfter,
    Timestamp,
    type DocumentData,
    type FirestoreError,
    type QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from '../lib/firebaseClient';
import type {
    CreateWeddingWishDocument,
    WeddingWish,
    WeddingWishDocument,
} from '../types/index';

type UseWeddingWishesResult = {
    wishes: WeddingWish[];
    isInitialLoading: boolean;
    isLoadingMore: boolean;
    isSubmitting: boolean;
    errorMessage: string;
    hasMore: boolean;
    submitWish: (guestName: string, message: string) => Promise<boolean>;
    loadMoreWishes: () => Promise<void>;
};

const WISHES_COLLECTION = 'wedding_wishes';
const WISH_PAGE_SIZE = 4;
const MAX_WISH_LENGTH = 300;

function isWeddingWishDocument(
    data: Record<string, unknown>
): data is WeddingWishDocument {
    return (
        typeof data.guestName === 'string' &&
        typeof data.message === 'string' &&
        data.createdAt instanceof Timestamp
    );
}

function mapWishDocument(
    document: QueryDocumentSnapshot<DocumentData>
): WeddingWish | null {
    const data = document.data() as Record<string, unknown>;

    if (!isWeddingWishDocument(data)) {
        return null;
    }

    return {
        id: document.id,
        guestName: data.guestName,
        message: data.message,
        createdAt: data.createdAt.toDate(),
    };
}

function mergeAndSortWishes(wishes: WeddingWish[]): WeddingWish[] {
    const wishMap = new Map<string, WeddingWish>();

    wishes.forEach((wish) => {
        wishMap.set(wish.id, wish);
    });

    return Array.from(wishMap.values()).sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
}

export function useWeddingWishes(): UseWeddingWishesResult {
    const [realtimeWishes, setRealtimeWishes] = useState<WeddingWish[]>([]);
    const [olderWishes, setOlderWishes] = useState<WeddingWish[]>([]);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [hasMore, setHasMore] = useState(true);

    const realtimeSnapshotCursorRef =
        useRef<QueryDocumentSnapshot<DocumentData> | null>(null);

    const paginationCursorRef =
        useRef<QueryDocumentSnapshot<DocumentData> | null>(null);

    const hasInitializedCursorRef = useRef(false);

    const wishes = useMemo(
        () => mergeAndSortWishes([...realtimeWishes, ...olderWishes]),
        [realtimeWishes, olderWishes]
    );

    useEffect(() => {
        const wishesRef = collection(db, WISHES_COLLECTION);

        const newestWishesQuery = query(
            wishesRef,
            orderBy('createdAt', 'desc'),
            limit(WISH_PAGE_SIZE)
        );

        const unsubscribe = onSnapshot(
            newestWishesQuery,
            (snapshot) => {
                const nextRealtimeWishes = snapshot.docs
                    .map(mapWishDocument)
                    .filter((wish): wish is WeddingWish => wish !== null);

                setRealtimeWishes((prevRealtimeWishes) =>
                    mergeAndSortWishes([...nextRealtimeWishes, ...prevRealtimeWishes])
                );

                realtimeSnapshotCursorRef.current = snapshot.docs.at(-1) ?? null;

                if (!hasInitializedCursorRef.current) {
                    paginationCursorRef.current = snapshot.docs.at(-1) ?? null;
                    hasInitializedCursorRef.current = true;
                    setHasMore(snapshot.docs.length === WISH_PAGE_SIZE);
                }

                setErrorMessage('');
                setIsInitialLoading(false);
            },
            (error: FirestoreError) => {
                console.error('[Realtime wishes error]', error);
                setErrorMessage('Không thể tải lời chúc. Bạn thử lại sau nha.');
                setIsInitialLoading(false);
            }
        );

        return () => {
            unsubscribe();
        };
    }, []);

    const loadMoreWishes = useCallback(async () => {
        if (isLoadingMore || !hasMore || !paginationCursorRef.current) return;

        setIsLoadingMore(true);
        setErrorMessage('');

        try {
            const wishesRef = collection(db, WISHES_COLLECTION);

            const olderWishesQuery = query(
                wishesRef,
                orderBy('createdAt', 'desc'),
                startAfter(paginationCursorRef.current),
                limit(WISH_PAGE_SIZE)
            );

            const snapshot = await getDocs(olderWishesQuery);

            const nextOlderWishes = snapshot.docs
                .map(mapWishDocument)
                .filter((wish): wish is WeddingWish => wish !== null);

            const lastDocument = snapshot.docs.at(-1) ?? null;

            if (lastDocument) {
                paginationCursorRef.current = lastDocument;
            }

            setOlderWishes((prevOlderWishes) =>
                mergeAndSortWishes([...prevOlderWishes, ...nextOlderWishes])
            );

            setHasMore(snapshot.docs.length === WISH_PAGE_SIZE);
        } catch (error) {
            const firestoreError = error as FirestoreError;

            console.error('[Load more wishes error]', firestoreError);
            setErrorMessage('Không thể tải thêm lời chúc. Bạn thử lại sau nha.');
        } finally {
            setIsLoadingMore(false);
        }
    }, [hasMore, isLoadingMore]);

    const submitWish = async (
        guestName: string,
        message: string
    ): Promise<boolean> => {
        const trimmedName = guestName.trim();
        const trimmedMessage = message.trim();

        if (!trimmedName) {
            setErrorMessage('Không tìm thấy tên khách mời.');
            return false;
        }

        if (!trimmedMessage) {
            setErrorMessage('Bạn nhập lời chúc trước nha.');
            return false;
        }

        if (trimmedMessage.length > MAX_WISH_LENGTH) {
            setErrorMessage(`Lời chúc tối đa ${MAX_WISH_LENGTH} ký tự thôi nha.`);
            return false;
        }

        setIsSubmitting(true);
        setErrorMessage('');

        const wishData: CreateWeddingWishDocument = {
            guestName: trimmedName,
            message: trimmedMessage,
            createdAt: serverTimestamp(),
        };

        try {
            await addDoc(collection(db, WISHES_COLLECTION), wishData);
            return true;
        } catch (error) {
            const firestoreError = error as FirestoreError;

            console.error('[Submit wedding wish error]', firestoreError);
            setErrorMessage('Gửi lời chúc chưa thành công. Bạn thử lại nha.');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        wishes,
        isInitialLoading,
        isLoadingMore,
        isSubmitting,
        errorMessage,
        hasMore,
        submitWish,
        loadMoreWishes,
    };
}