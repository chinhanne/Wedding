import type {
  MiniGameQuestion,
  WeddingTimelineItem,
  WeddingWish,
} from '../types';

export const weddingInfo = {
  brideName: 'Ngọc Châu',
  groomName: 'Minh Đức',
  weddingStartDate: '2026-09-19T10:00:00+07:00',
  weddingEndDate: '2026-09-20T23:59:59+07:00',
  displayDate: '19.09.2026 - 20.09.2026',
  venueName: 'Ấp Bình Linh, Xã Mỹ Hiệp, Tỉnh Đồng Tháp',
  address: '194 Hoàng Văn Thụ, P.9, Q. Phú Nhuận, TP.HCM',
  mapDirectionUrl:
    'https://www.google.com/maps?q=10.328764039230721,105.77746348891796',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=loc:10.328764039230721,105.77746348891796&hl=vi&z=17&output=embed',
};

export const weddingImages = [
  '/images/DSC_4549.png',
  '/images/DSC_4852.png',
  '/images/DSC_5098.png',
  '/images/DSC_5105.png',
  '/images/DSC_5264.png',
  '/images/DSC_5650.png',
];

export const timelineItems: WeddingTimelineItem[] = [
  {
    time: '10:00',
    title: 'Đón khách',
    description: 'Cùng check-in và lưu lại vài tấm ảnh xinh.',
    iconKey: 'flower',
  },
  {
    time: '11:00',
    title: 'Tiệc mừng',
    description: 'Ăn uống, nâng ly và chung vui cùng tụi mình.',
    iconKey: 'ring',
  },
  {
    time: '12:00',
    title: 'Chụp ảnh',
    description: 'Đừng quên chụp hình cùng cô dâu chú rể nha.',
    iconKey: 'camera',
  }
];

export const miniGameQuestions: MiniGameQuestion[] = [
  {
    id: '1',
    question: 'Tụi mình gặp nhau lần đầu ở đâu?',
    options: ['Quán cà phê', 'Trường học', 'Công ty', 'Đám cưới bạn'],
    answerIndex: 0,
  },
  {
    id: '2',
    question: 'Ai là người nhắn tin trước?',
    options: ['Cô dâu', 'Chú rể', 'Bạn thân', 'Không ai nhớ'],
    answerIndex: 1,
  },
  {
    id: '3',
    question: 'Món tụi mình hay ăn cùng nhau nhất?',
    options: ['Trà sữa', 'Bún bò', 'Lẩu', 'Pizza'],
    answerIndex: 2,
  },
];