import { AxiosRequestConfig, AxiosResponse } from '../types';

export class AxiosError extends Error {
  config: AxiosRequestConfig;
  code?: string | null;
  request?: any;
  response?: AxiosResponse;
  isAxiosError?: boolean;
  /* istanbul ignore next */
  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse,
  ) {
    super(message);

    this.config = config;
    this.code = code;
    this.request = request;
    this.response = response;
    this.isAxiosError = true;

    // 为了解决ts继承中一些内置对象时候的坑
    Object.setPrototypeOf(this, AxiosError.prototype);
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse,
): AxiosError {
  const error = new AxiosError(message, config, code, request, response);

  return error;
}
