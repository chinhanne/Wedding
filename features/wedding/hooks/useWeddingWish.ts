'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  addDoc,
  collection,
  getCountFromServer,
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
import {
  MAX_GUEST_NAME_LENGTH,
  MAX_WISH_LENGTH,
} from '../constants/validation';
import { db } from '../lib/firebaseClient';
import type {
  CreateWeddingWishDocument,
  WeddingWish,
  WeddingWishDocument,
} from '../types/index';

export type UseWeddingWishesResult = {
  wishes: WeddingWish[];
  totalWishCount: number | null;
  isInitialLoading: boolean;
  isLoadingMore: boolean;
  isSubmitting: boolean;
  errorMessage: string;
  hasMore: boolean;
  submitWish: (guestName: string, message: string) => Promise<boolean>;
  loadMoreWishes: () => Promise<void>;
};

const WISHES_COLLECTION = 'wedding_wishes';
const WISH_PAGE_SIZE = 10;

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

export function useWeddingWishes(
  enabled = true
): UseWeddingWishesResult {
  const [realtimeWishes, setRealtimeWishes] = useState<WeddingWish[]>([]);
  const [olderWishes, setOlderWishes] = useState<WeddingWish[]>([]);
  const [totalWishCount, setTotalWishCount] = useState<number | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasMore, setHasMore] = useState(true);

  const paginationCursorRef =
    useRef<QueryDocumentSnapshot<DocumentData> | null>(null);

  const hasInitializedCursorRef = useRef(false);
  const isLoadingMoreRef = useRef(false);

  const wishes = useMemo(() => {
    return mergeAndSortWishes([...realtimeWishes, ...olderWishes]);
  }, [realtimeWishes, olderWishes]);

  useEffect(() => {
    if (!enabled) return;

    const wishesRef = collection(db, WISHES_COLLECTION);
    let isActive = true;

    void getCountFromServer(wishesRef)
      .then((snapshot) => {
        if (isActive) {
          setTotalWishCount(snapshot.data().count);
        }
      })
      .catch((error: FirestoreError) => {
        console.error('[Count wishes error]', error);
      });

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
      isActive = false;
      unsubscribe();
    };
  }, [enabled]);

  const loadMoreWishes = useCallback(async () => {
    if (isLoadingMoreRef.current || !hasMore || !paginationCursorRef.current) {
      return;
    }

    isLoadingMoreRef.current = true;
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
      isLoadingMoreRef.current = false;
      setIsLoadingMore(false);
    }
  }, [hasMore]);

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

    if (trimmedName.length > MAX_GUEST_NAME_LENGTH) {
      setErrorMessage(`Tên khách mời tối đa ${MAX_GUEST_NAME_LENGTH} ký tự.`);
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
      setTotalWishCount((currentCount) =>
        currentCount === null ? null : currentCount + 1
      );
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

  const canLoadMore =
    hasMore && (totalWishCount === null || wishes.length < totalWishCount);

  return {
    wishes,
    totalWishCount,
    isInitialLoading,
    isLoadingMore,
    isSubmitting,
    errorMessage,
    hasMore: canLoadMore,
    submitWish,
    loadMoreWishes,
  };
}
