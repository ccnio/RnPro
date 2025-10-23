// src/services/advertisement.ts
import {request} from './http';
import {Resource} from '@/types/resource';

// 广告响应接口
export interface AdvertisementResponse {
  adUrl: string;
}

// 获取广告
export const getAdvertisement = async (): Promise<Resource<AdvertisementResponse>> => {
  return await request.get<AdvertisementResponse>('adUrl');
  // if (isSuccess(resource)) {
  //   return createSuccess(resource.data);
  // } else {
  //   console.warn('获取广告失败:', resource.errorMsg);
  //   return createError(
  //     resource.errorCode,
  //     resource.errorMsg || '获取广告失败',
  //     resource.throwable
  //   );
  // }
};
