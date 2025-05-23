import { Review } from '@/models';

export const mockReviews: Review[] = [
  {
    id: 1,
    userName: 'Nguyễn Văn A',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    date: '20/06/2024',
    content:
      'Giày rất đẹp và thoải mái. Tôi đã mua size 42 và vừa chân hoàn hảo. Chất liệu cũng tốt, rất đáng tiền.',
    helpful: 15,
  },
  {
    id: 2,
    userName: 'Trần Thị B',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4.5,
    date: '15/06/2024',
    content:
      'Mua cho con gái tôi và cô bé rất thích. Giày đúng với mô tả, giao hàng nhanh. Chỉ tiếc là không có màu hồng.',
    helpful: 8,
  },
  {
    id: 3,
    userName: 'Lê Văn C',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 5,
    date: '10/06/2024',
    content:
      'Đây là đôi giày Nike thứ 5 của tôi và không làm tôi thất vọng. Đế giày rất đàn hồi, phù hợp để chạy bộ hàng ngày.',
    helpful: 12,
  },
  {
    id: 4,
    userName: 'Phạm Thị D',
    avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
    rating: 4,
    date: '05/06/2024',
    content:
      'Giày đẹp, nhưng hơi chật so với size thông thường. Nếu bạn có bàn chân rộng, hãy chọn size lớn hơn 0.5.',
    helpful: 10,
  },
  {
    id: 5,
    userName: 'Hoàng Văn E',
    rating: 3.5,
    date: '01/06/2024',
    content:
      'Giày đẹp nhưng phần gót bị cọ vào chân hơi đau. Cần thời gian để làm quen với nó. Giao hàng nhanh và đóng gói cẩn thận.',
    helpful: 5,
  },
];
