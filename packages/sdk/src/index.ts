import Axios from './core/Axios';
import { AxiosRequestConfig, AxiosStatic } from './types';
import { extend } from './utils';
import defaults from './defaults';
import mergeConfig from './core/mergeConfig';
import CancelToken from './cancel/CancelToken';
import Cancel, { isCancel } from './cancel/Cancel';

export * from './types';

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  // @ts-ignore
  const context = new Axios(config);

  const instance = Axios.prototype.request.bind(context);

  extend(instance, context);
  extend(instance, context.prototype);

  return instance as AxiosStatic;
}

const axios = createInstance(defaults);

//  创建新的实例
axios.create = function create(config: AxiosRequestConfig) {
  return createInstance(mergeConfig(defaults, config));
};

axios.CancelToken = CancelToken;
axios.Cancel = Cancel;
axios.isCancel = isCancel;

axios.all = function all(promise) {
  return Promise.all(promise);
};
// 接收一个函数，让函数去处理参数,其实就是解构参数
axios.spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};
axios.race = function race(promise) {
  return Promise.race(promise);
};

export default axios;
