// src/services/http.ts
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {appConfig} from '@/config/app';
import {ErrorHandler} from '@/utils/errorHandler';
import {
  createError,
  createSuccess,
  isError,
  Resource,
  ResourceError,
} from '@/types/resource';

// 响应数据接口
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 创建 axios 实例
const createHttpClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: __DEV__
      ? 'http://127.0.0.1:4523/m1/7240974-6967587-default/api'
      : 'http://127.0.0.1:4523/m1/7240974-6967587-default/api',
    timeout: appConfig.api.timeout,
    headers: {
      'Content-Type': 'application/json',
      // 平台相关 header
      'X-Platform': appConfig.getPlatformCode(),
      'X-Platform-Version': appConfig.getPlatformVersion(),
      'X-Client-Type': 'mobile',
      'X-App-Version': appConfig.version,
      'X-App-Name': appConfig.name,
      'User-Agent': appConfig.getUserAgent(),
    },
  });

  // 请求拦截器
  instance.interceptors.request.use(
    config => {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
      console.log(`📱 Platform: ${appConfig.getPlatformVersion()}`);

      // 确保每次请求都包含最新的平台信息
      if (config.headers) {
        config.headers['X-Platform'] = appConfig.getPlatformCode();
        config.headers['X-Platform-Version'] = appConfig.getPlatformVersion();
        config.headers['X-Client-Type'] = 'mobile';
        config.headers['X-App-Version'] = appConfig.version;
        config.headers['X-App-Name'] = appConfig.name;
        config.headers['User-Agent'] = appConfig.getUserAgent();
      }

      return config;
    },
    error => Promise.reject(error),
  );

  // 响应拦截器
  instance.interceptors.response.use(
    response => {
      console.log(`✅ ${response.status} ${response.config.url}`);

      // 检查业务状态码
      const responseData = response.data;
      if (responseData && typeof responseData === 'object' && 'code' in responseData) {
        if (responseData.code !== 100) {
          // 业务状态码不是100，当作失败处理
          console.error(`❌ 业务状态码错误: ${responseData.code} - ${responseData.message}`);
          const resourceError = createError(
            responseData.code,
            responseData.message || '业务处理失败',
            new Error(responseData.message || '业务处理失败'),
          );
          return Promise.reject(resourceError);
        }
      }

      return response;
    },
    error => {
      console.error(
        `❌ ${error.response?.status || 'Network Error'} ${error.config?.url}`,
      );

      // 处理 401 未授权
      if (error.response?.status === 401) {
        console.log('🔒 用户未授权，需要登录');
        // 这里可以触发登录逻辑，比如跳转到登录页
        // navigation.navigate('Login');
      }

      // 使用简化的异常处理器
      const appError = ErrorHandler.handleError(error);

      // 创建 Resource Error 对象
      const resourceError = createError(
        appError.code || error.code || error.response?.status || -1,
        appError.message,
        error,
      );

      return Promise.reject(resourceError);
    },
  );

  return instance;
};

// 导出 HTTP 客户端
export const http = createHttpClient();

// 通用请求方法
export const request = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<Resource<T>> => {
    try {
      const response = await http.get<ApiResponse<T>>(url, config);
      return createSuccess(response.data.data);
    } catch (error) {
      // 拦截器已经返回 ResourceError，直接返回
      if (isError(error as Resource<any>)) {
        return error as ResourceError;
      }
      // 兜底处理
      return createError(
        (error as any).code || -1,
        (error as any).message || '请求失败',
        error as Error,
      );
    }
  },

  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<Resource<T>> => {
    try {
      const response = await http.post<ApiResponse<T>>(url, data, config);
      return createSuccess(response.data.data);
    } catch (error) {
      // 拦截器已经返回 ResourceError，直接返回
      if (isError(error as Resource<any>)) {
        return error as ResourceError;
      }
      // 兜底处理
      return createError(
        (error as any).code || -1,
        (error as any).message || '请求失败',
        error as Error,
      );
    }
  },

  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<Resource<T>> => {
    try {
      const response = await http.put<ApiResponse<T>>(url, data, config);
      return createSuccess(response.data.data);
    } catch (error) {
      // 拦截器已经返回 ResourceError，直接返回
      if (isError(error as Resource<any>)) {
        return error as ResourceError;
      }
      // 兜底处理
      return createError(
        (error as any).code || -1,
        (error as any).message || '请求失败',
        error as Error,
      );
    }
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<Resource<T>> => {
    try {
      const response = await http.delete<ApiResponse<T>>(url, config);
      return createSuccess(response.data.data);
    } catch (error) {
      // 拦截器已经返回 ResourceError，直接返回
      if (isError(error as Resource<any>)) {
        return error as ResourceError;
      }
      // 兜底处理
      return createError(
        (error as any).code || -1,
        (error as any).message || '请求失败',
        error as Error,
      );
    }
  },
};

export default http;
