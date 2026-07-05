import type { ElementType } from 'react';

import {
  CalendarOutlined,
  CameraOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  GiftOutlined,
  HeartFilled,
  HomeOutlined,
  SendOutlined,
  SoundOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { FaGamepad, FaGlassCheers } from 'react-icons/fa';
import { GiBigDiamondRing, GiFlowerPot } from 'react-icons/gi';

import type { WeddingIconKey } from '../../types';

type WeddingIconProps = {
  className?: string;
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

  game: FaGamepad,
  ring: GiBigDiamondRing,
  flower: GiFlowerPot,
  cheers: FaGlassCheers,
};