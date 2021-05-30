import { transformRequest, transformResponse } from './helpers/data';
import { processHeaders } from './helpers/headers';
import { AxiosRequestConfig } from './types';

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 10 * 1000,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
    },
  },

  transformRequest: [
    function (data: any, headers?: any): any {
      processHeaders(headers, data);
      return transformRequest(data);
    },
  ],

  transformResponse: [
    function (data: any) {
      return transformResponse(data);
    },
  ],

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
};

const methodsNoData = ['delete', 'get', 'head', 'options'];
const methodsWithData = ['post', 'patch', 'put'];

methodsNoData.forEach(method => {
  defaults.headers[method] = {};
});

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Type': 'application/json;charset=utf-8', // 默认data数据的都是json传输
  };
});

export default defaults;
