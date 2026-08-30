import type { ElementType } from 'react';

import {
  CalendarOutlined,
  CameraOutlined,
  ClockCircleOutlined,
  CoffeeOutlined,
  CrownOutlined,
  EnvironmentOutlined,
  GiftOutlined,
  HeartFilled,
  HeartOutlined,
  HomeOutlined,
  SendOutlined,
  SmileOutlined,
  SoundOutlined,
  StarOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons';

import type { WeddingIconKey } from '../../types';

type WeddingIconProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const WeddingIcons: Record<
  WeddingIconKey,
  ElementType<WeddingIconProps>
> = {
  user: UserOutlined,
  heart: HeartFilled,
  music: SoundOutlined,
  gift: GiftOutlined,
  calendar: CalendarOutlined,
  map: EnvironmentOutlined,
  send: SendOutlined,
  camera: CameraOutlined,
  clock: ClockCircleOutlined,
  home: HomeOutlined,
  trophy: TrophyOutlined,

  game: StarOutlined,
  ring: HeartOutlined,
  flower: UserOutlined,
  cheers: CoffeeOutlined,
};