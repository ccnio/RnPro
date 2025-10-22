// src/types/resource.ts

// 成功状态
export interface Success<T> {
  readonly isSuccess: true;
  readonly isError: false;
  readonly data: T;
}

// 错误状态
export interface ResourceError {
  readonly isSuccess: false;
  readonly isError: true;
  readonly errorCode?: number;
  readonly errorMsg?: string;
  readonly throwable?: Error;
}

// 联合类型
export type Resource<T> = Success<T> | ResourceError;

// 类型守卫函数
export const isSuccess = <T>(resource: Resource<T>): resource is Success<T> => {
  return resource.isSuccess;
};

export const isError = (resource: Resource<any>): resource is ResourceError => {
  return resource.isError;
};

// 工厂函数
export const createSuccess = <T>(data: T): Success<T> => ({
  isSuccess: true,
  isError: false,
  data,
});

export const createError = (
  errorCode?: number,
  errorMsg?: string,
  throwable?: Error
): ResourceError => ({
  isSuccess: false,
  isError: true,
  errorCode,
  errorMsg,
  throwable,
});