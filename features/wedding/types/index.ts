import type { FieldValue, Timestamp } from 'firebase/firestore';
export type WeddingIconKey =
  | 'user'
  | 'heart'
  | 'music'
  | 'gift'
  | 'calendar'
  | 'map'
  | 'send'
  | 'camera'
  | 'clock'
  | 'home'
  | 'trophy'
  | 'game'
  | 'ring'
  | 'flower'
  | 'cheers';

export type WeddingTimelineItem = {
  time: string;
  title: string;
  description: string;
  iconKey: WeddingIconKey;
};

export type MiniGameQuestion = {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
};

export type WeddingWish = {
  id: string;
  guestName: string;
  message: string;
  createdAt: Date;
};

export type WeddingWishDocument = {
  guestName: string;
  message: string;
  createdAt: Timestamp;
};

export type CreateWeddingWishDocument = {
  guestName: string;
  message: string;
  createdAt: FieldValue;
};