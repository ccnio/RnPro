// src/hooks/useBanner.ts
import { Banner, bannerApi, BannerListParams } from '@/services/banner';
import { createApiHook, BaseApiReturn } from './useApiData';

// 使用基础接口，只需要添加特定的数据字段
interface UseBannerReturn extends Omit<BaseApiReturn<Banner[]>, 'data'> {
  banners: Banner[];
}

export const useBanner = createApiHook<Banner[], BannerListParams>({
  queryKey: (params) => ['banners', params?.type || 'home'],
  queryFn: (params) => bannerApi.getList(params),
  dataKey: 'banners',
}) as (params?: BannerListParams) => UseBannerReturn;
