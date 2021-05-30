import { createError } from '../../src/helpers/error';
import { AxiosRequestConfig, AxiosResponse } from '../../src/types';
// import

describe('helpers:error', () => {
  test('should createError', () => {
    const request = new XMLHttpRequest();
    const config: AxiosRequestConfig = {
      url: '/spec/error',
      method: 'post',
    };
    const response: AxiosResponse = {
      status: 200,
      statusText: 'OK',
      headers: null,
      request,
      config,
      data: { a: 1 },
    };
    const error = createError('test error', config, 'TEST', request, response);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('test error');
    expect(error.config).toBe(config);
    expect(error.code).toBe('TEST');
    expect(error.request).toBe(request);
    expect(error.response).toBe(response);
    expect(error.isAxiosError).toBeTruthy();
  });
});
