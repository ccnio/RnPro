// src/services/http.ts
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {appConfig} from '@/config/app';
import {ErrorHandler} from '@/utils/errorHandler';
import {ErrorType, AppError} from '@/types/error';

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

      // 创建统一的错误对象
      const businessError: AppError & Error = {
        name: 'BusinessError',
        message: appError.message,
        type: appError.type,
        code: appError.code || error.code || error.response?.status || -1,
      };

      return Promise.reject(businessError);
    },
  );

  return instance;
};

// 导出 HTTP 客户端
export const http = createHttpClient();

// 通用请求方法
export const request = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    http.get<ApiResponse<T>>(url, config).then(res => res.data),

  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    http.post<ApiResponse<T>>(url, data, config).then(res => res.data),

  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    http.put<ApiResponse<T>>(url, data, config).then(res => res.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    http.delete<ApiResponse<T>>(url, config).then(res => res.data),
};

export default http;
