// src/types/error.ts
// 简化的异常类型
export enum ErrorType {
  NETWORK = 'NETWORK',   // 网络异常
  OTHER = 'OTHER',       // 其他异常
}

// 简化的异常接口
export interface AppError {
  type: ErrorType;
  message: string;
  code?: number | string;
}
