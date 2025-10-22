// src/services/banner.ts
import { request } from './http';
import { isSuccess, isError } from '@/types/resource';

// Banner 数据类型
export interface Banner {
  id: number;
  title: string;
  imageUrl: string;
  linkUrl?: string;
  status: 'active' | 'inactive';
  type?: string;
}

// Banner 请求参数
export interface BannerListParams {
  type?: string;
}

// Banner API 服务
export const bannerApi = {
  // 获取轮播图列表
  getList: async (params?: BannerListParams): Promise<Banner[]> => {
    const resource = await request.get<Banner[]>('/banner', {
      params: {
        type: params?.type || 'home', // 默认类型为 home
      },
    });

    if (isSuccess(resource)) {
      // 只返回激活状态的轮播图
      return resource.data.filter(banner => banner.status === 'active');
    } else if (isError(resource)) {
      console.warn('获取轮播图失败，使用默认数据:', resource.errorMsg);
      return getDefaultBanners();
    }

    return getDefaultBanners();
  },
};

// 默认轮播图数据（降级方案）
const getDefaultBanners = (): Banner[] => [
  {
    id: 1,
    title: '默认轮播图1',
    imageUrl: 'https://picsum.photos/800/400?1',
    status: 'active',
  },
  {
    id: 2,
    title: '默认轮播图2',
    imageUrl: 'https://picsum.photos/800/400?2',
    status: 'active',
  },
  {
    id: 3,
    title: '默认轮播图3',
    imageUrl: 'https://picsum.photos/800/400?3',
    status: 'active',
  },
];
