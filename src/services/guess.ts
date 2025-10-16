// src/services/guess.ts
import {request} from './http';

export interface GuessItem {
  id: number;
  linkUrl: string;
  image: string;
}

// 猜你喜欢 API 服务
export const guessApi = {
  // 获取猜你喜欢列表
  getList: async (): Promise<GuessItem[]> => {
    try {
      const response = await request.get<GuessItem[]>('/guess');
      return response.data;
    } catch (error) {
      console.warn('获取猜你喜欢失败，使用默认数据:', error);
      return getDefaultGuessItems();
    }
  },
};

// 默认猜你喜欢数据（降级方案）
const getDefaultGuessItems = (): GuessItem[] => [
  {
    id: 1,
    linkUrl: 'https://example.com/item1',
    image: 'https://picsum.photos/200/200?1',
  },
  {
    id: 2,
    linkUrl: 'https://example.com/item2',
    image: 'https://picsum.photos/200/200?2',
  },
  {
    id: 3,
    linkUrl: 'https://example.com/item3',
    image: 'https://picsum.photos/200/200?3',
  },
  {
    id: 4,
    linkUrl: 'https://example.com/item4',
    image: 'https://picsum.photos/200/200?4',
  },
  {
    id: 5,
    linkUrl: 'https://example.com/item5',
    image: 'https://picsum.photos/200/200?5',
  },
  {
    id: 6,
    linkUrl: 'https://example.com/item6',
    image: 'https://picsum.photos/200/200?6',
  },
];
