import type {
  MiniGameQuestion,
  WeddingTimelineItem,
} from '../types';

export const weddingInfo = {
  brideName: 'Ngọc Châu',
  groomName: 'Minh Đức',
  weddingStartDate: '2026-09-19T10:00:00+07:00',
  weddingEndDate: '2026-09-20T23:59:59+07:00',
  displayDate: '10:00 Sáng | 19.09.2026',
  venueName: 'Ấp Bình Linh, Xã Mỹ Hiệp, Tỉnh Đồng Tháp',
  address: '194 Hoàng Văn Thụ, P.9, Q. Phú Nhuận, TP.HCM',
  mapDirectionUrl:
    'https://www.google.com/maps?q=10.328764039230721,105.77746348891796',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=loc:10.328764039230721,105.77746348891796&hl=vi&z=17&output=embed',
};

export const weddingImages = [
  { src: '/images/DSC_4549.png', objectPosition: 'center 35%' },
  { src: '/images/h1.jpg', objectPosition: 'center 10%' },
  { src: '/images/h2.jpg', objectPosition: 'center 16%' },
  { src: '/images/h3.jpg', objectPosition: 'center 16%' },
  { src: '/images/DSC_5098.png', objectPosition: 'center 30%' },
  { src: '/images/DSC_5105.png', objectPosition: 'center 30%' },
  { src: '/images/DSC_5264.png', objectPosition: 'center 30%' },
  { src: '/images/DSC_5650.png', objectPosition: 'center 40%' },
];

export const timelineItems: WeddingTimelineItem[] = [
  {
    time: '10:00',
    title: 'Đón khách',
    description: 'Cùng check-in và lưu lại vài tấm ảnh xinh.',
    iconKey: 'user',
  },
  {
    time: '11:00',
    title: 'Tiệc mừng',
    description: 'Ăn uống, nâng ly và chung vui cùng tụi mình.',
    iconKey: 'gift',
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
  {
    id: '4',
    question: 'Ai thường là người đến trễ hơn?',
    options: ['Cô dâu', 'Chú rể', 'Cả hai', 'Chưa bao giờ trễ'],
    answerIndex: 0,
  },
  {
    id: '5',
    question: 'Cuối tuần tụi mình thích làm gì nhất?',
    options: ['Đi xem phim', 'Đi ăn', 'Du lịch ngắn ngày', 'Ở nhà ngủ'],
    answerIndex: 2,
  },
  {
    id: '6',
    question: 'Ai là người nói lời yêu trước?',
    options: ['Cô dâu', 'Chú rể', 'Cùng một lúc', 'Bạn bè nói hộ'],
    answerIndex: 1,
  },
  {
    id: '7',
    question: 'Biệt danh tụi mình hay gọi nhau là gì?',
    options: ['Bé yêu', 'Bạn đời', 'Heo', 'Bí mật nha'],
    answerIndex: 3,
  },
];
