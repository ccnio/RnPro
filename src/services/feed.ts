// src/services/feed.ts
import { request, ApiResponse } from './http';

// Feed 数据类型
export interface FeedItem {
  id: string;
  img: string;
  title: string;
  playNum: number;
  favNum: number;
}

// Feed 响应数据类型
export interface FeedResponse {
  content: FeedItem[];
  totalPage: number;
}

// Feed 请求参数
export interface FeedListParams {
  page?: number;
  pageSize?: number;
}

// Feed API 服务
export const feedApi = {
  // 获取 Feed 列表
  getList: async (params?: FeedListParams): Promise<FeedResponse> => {
    try {
      const response: ApiResponse<FeedResponse> = await request.get<FeedResponse>('/feed', {
        params:{
          page: params?.page || 1,
        }
      });

      console.log('Feed API 响应:', response);

      // 检查响应码
      if (response.code === 100) {
        console.log('Feed API 成功，返回数据:', response.data);
        return response.data;
      } else {
        console.warn('Feed API 响应码错误:', response.code, response.message);
        throw new Error(response.message || '获取 Feed 失败');
      }
    } catch (error) {
      console.warn('获取 Feed 失败，使用默认数据:', error);
      return getDefaultFeedResponse();
    }
  },
};

// 默认 Feed 数据（降级方案）
const getDefaultFeedResponse = (): FeedResponse => ({
  content: [
    {
      id: '1',
      img: 'https://picsum.photos/200/150?1',
      title: '默认 Feed 标题 1',
      playNum: 1000,
      favNum: 100,
    },
    {
      id: '2',
      img: 'https://picsum.photos/200/150?2',
      title: '默认 Feed 标题 2',
      playNum: 2000,
      favNum: 200,
    },
    {
      id: '3',
      img: 'https://picsum.photos/200/150?3',
      title: '默认 Feed 标题 3',
      playNum: 3000,
      favNum: 300,
    },
  ],
  totalPage: 1,
});
