import {
  AxiosInterceptorManager,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  RejectedFn,
  ResolvedFn,
} from '../types';
import dispatchRequest, { transformUrl } from './dispatchRequest';
import InterceptorManager from './interceptorManager';
import mergeConfig from './mergeConfig';

interface Interceptors {
  request: AxiosInterceptorManager<AxiosRequestConfig>;
  response: AxiosInterceptorManager<AxiosResponse>;
}

interface PromiseChain {
  resolved: ResolvedFn | ((config: AxiosRequestConfig) => AxiosPromise);
  rejected?: RejectedFn;
}

interface IAxios {
  defaults: AxiosRequestConfig;
  interceptors: Interceptors;
}

export default function Axios(this: IAxios, initConfig: AxiosRequestConfig) {
  this.defaults = initConfig;
  this.interceptors = {
    request: new InterceptorManager<AxiosRequestConfig>(),
    response: new InterceptorManager<AxiosResponse>(),
  };
}

Axios.prototype.request = function (url: string, config?: any): AxiosPromise {
  if (typeof url === 'string') {
    if (!config) {
      config = {};
    }
    config.url = url;
  } else {
    config = url;
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method.toLowerCase()

  const chain: PromiseChain[] = [
    {
      resolved: dispatchRequest,
      rejected: undefined,
    },
  ];

  this.interceptors.request.forEach((interceptor: PromiseChain) => {
    chain.unshift(interceptor);
  });
  this.interceptors.response.forEach((interceptor: PromiseChain) => {
    chain.push(interceptor);
  });

  let promise = Promise.resolve(config);

  while (chain.length) {
    const { resolved, rejected } = chain.shift() as PromiseChain;

    promise = promise.then(resolved, rejected);
  }
  return promise;
};

Axios.prototype._requestMethodWithoutData = function (
  method: Method,
  url: string,
  config?: AxiosRequestConfig,
): AxiosPromise {
  return this.request(
    Object.assign(config || {}, {
      method,
      url,
    }),
  );
};

Axios.prototype._requestMethodWithData = function (
  method: Method,
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): AxiosPromise {
  return this.request(
    Object.assign(config || {}, {
      url,
      data,
      method,
    }),
  );
};

['delete', 'get', 'head', 'options'].forEach(method => {
  Axios.prototype[method] = function (
    url: string,
    config?: AxiosRequestConfig,
  ): AxiosPromise {
    return this._requestMethodWithoutData(method, url, config);
  };
});

['post', 'put', 'patch'].forEach(method => {
  Axios.prototype[method] = function (
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise {
    return this._requestMethodWithData(method, url, data, config);
  };
});

Axios.prototype.getUri = function (config: AxiosRequestConfig) {
  config = mergeConfig(this.defaults, config);
  return transformUrl(config);
};
