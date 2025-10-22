// src/utils/errorHandler.ts
import { ErrorType } from '@/types/error';

// 简化的异常检测器
export class ErrorDetector {
  /**
   * 检测异常类型 - 只区分网络异常和其他异常
   */
  static detectErrorType(error: any): ErrorType {
    // 网络相关异常
    if (this.isNetworkError(error)) {
      return ErrorType.NETWORK;
    }

    // 其他所有异常
    return ErrorType.OTHER;
  }

  /**
   * 检测是否为网络异常
   */
  private static isNetworkError(error: any): boolean {
    // 没有响应（网络不通）
    if (error.request && !error.response) {
      return true;
    }

    // 网络错误码
    const networkErrorCodes = [
      'NETWORK_ERROR',
      'ERR_NETWORK',
      'ERR_INTERNET_DISCONNECTED',
      'ERR_CONNECTION_REFUSED',
      'ERR_CONNECTION_TIMED_OUT',
      'ERR_CONNECTION_RESET',
      'ECONNABORTED', // 超时
    ];

    return error.code && networkErrorCodes.includes(error.code);
  }

  /**
   * 获取用户友好的错误消息
   */
  static getUserFriendlyMessage(errorType: ErrorType, originalMessage?: string): string {
    switch (errorType) {
      case ErrorType.NETWORK:
        return '网络连接异常，请检查网络设置';
      case ErrorType.OTHER:
        return originalMessage || '服务出错，请稍后重试';
      default:
        return '操作失败，请重试';
    }
  }
}

// 简化的异常处理器
export class ErrorHandler {
  /**
   * 处理异常并返回处理结果
   */
  static handleError(error: any): { type: ErrorType; message: string; code?: number } {
    const errorType = ErrorDetector.detectErrorType(error);
    const userMessage = ErrorDetector.getUserFriendlyMessage(errorType, error.message);

    return {
      type: errorType,
      message: userMessage,
      code: error.code || error.response?.status,
    };
  }
}
