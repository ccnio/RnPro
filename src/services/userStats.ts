// src/services/userStats.ts
import {request} from './http';
import {createSuccess, createError, isSuccess, Resource} from '@/types/resource';

// 用户统计数据接口
export interface UserStatsData {
  favorNum: number;
  postNum: number;
}

// 喜欢数响应接口
export interface FavorNumResponse {
  favorNum: number;
}

// 帖子数响应接口
export interface PostNumResponse {
  postNum: number;
}

// 获取用户喜欢数
export const getUserFavorNum = async (): Promise<Resource<FavorNumResponse>> => {
  return request.get<FavorNumResponse>('favorNum');
};

// 获取用户帖子数
export const getUserPostNum = async (): Promise<Resource<PostNumResponse>> => {
  return request.get<PostNumResponse>('postNum');
};

// 同时获取用户统计数据
export const getUserStats = async (): Promise<Resource<UserStatsData>> => {
  console.log('开始获取用户统计数据...');

  const [favorResource, postResource] = await Promise.all([
    getUserFavorNum(),
    getUserPostNum(),
  ]);

  console.log('用户数据API响应:', {
    favorResource,
    postResource,
  });

  // 检查两个接口是否都成功
  if (isSuccess(favorResource) && isSuccess(postResource)) {
    const result: UserStatsData = {
      favorNum: favorResource.data.favorNum,
      postNum: postResource.data.postNum,
    };
    console.log('用户统计数据获取成功:', result);
    return createSuccess(result);
  } else {
    // 返回第一个错误，或者创建一个通用错误
    const errorResource = isSuccess(favorResource) ? postResource : favorResource;
    console.error('用户统计数据获取失败:', errorResource);
    
    // 创建一个新的错误资源，类型为 Resource<UserStatsData>
    if (isSuccess(errorResource)) {
      // 这种情况不应该发生，但为了类型安全
      return createError(-1, '获取用户统计数据失败');
    } else {
      return createError(
        errorResource.errorCode,
        errorResource.errorMsg || '获取用户统计数据失败',
        errorResource.throwable
      );
    }
  }
};
