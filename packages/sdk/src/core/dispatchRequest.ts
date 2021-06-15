import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types';
import xhr from './xhr';
import { buildURL, combineURL, isAbsoluteURL } from '../helpers/url';
// import { transformRequest, transformResponse } from '../helpers/data';
import { processHeaders } from '../helpers/headers';
import { flattenHeaders } from '../utils';
import transform from './transform';

export default function dispatchRequest(
  config: AxiosRequestConfig,
): AxiosPromise {
  throwIfCancellationRequested(config);
  processConfig(config);
  return xhr(config).then(
    res => {
      return transformResponseData(res);
    },
    e => {
      if (e && e.response) {
        e.response = transformResponseData(e.response);
      }
      return Promise.reject(e);
    },
  );
}

// 主要是对config中是数据进行处理
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config);
  config.headers = flattenHeaders(config.headers, config.method!);
  config.headers = transformHeaders(config);
  // config.data = transformRequestData(config);
  config.data = transform(
    config.data,
    config.headers,
    config.transformRequest!,
  );
}

// 转换，构建url
export function transformUrl(config: AxiosRequestConfig): string {
  let { baseUrl, url, params, paramsSerializer } = config;
  if (baseUrl && !isAbsoluteURL(url!)) {
    url = combineURL(baseUrl, url!);
  }
  return buildURL(url!, params, paramsSerializer);
}

// 转换请求头
function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data = {} } = config;
  return processHeaders(headers, data);
}

// 请求data
// function transformRequestData(config: AxiosRequestConfig): any {
//   return transformRequest(config.data);
// }

// 响应数据
function transformResponseData(res: AxiosResponse): AxiosResponse {
  // res.data = transformResponse(res.data);
  res.data = transform(res.data, res.headers, res.config.transformResponse!);
  return res;
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}
