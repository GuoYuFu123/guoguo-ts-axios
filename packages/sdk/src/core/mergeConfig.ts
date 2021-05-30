import { AxiosRequestConfig } from '../types';
import { isPlainObject, deepMerge } from '../utils';

const strats = Object.create(null);

// 默认合并策略【简单的值复制】
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1;
}
// 只从val2中取数据
//@ts-ignore
function fromVal2strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') return val2;
 
}
// 引用类型合并
// 先看val2引用类型，然后是值类型，再看val1的类型
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2);
  } else if (typeof val2 !== 'undefined') {
    return val2;
  } else if (isPlainObject(val1)) {
    return deepMerge({}, val1);
  } else {
    return val1;
  }
}

// config中哪些key从val2取
const stratKeysFromVal2 = ['url', 'params', 'data'];
stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2strat;
});
// 引用类型深复制
const stratKeyDeepMerge = ['headers', 'auth'];
stratKeyDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat;
});

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2: AxiosRequestConfig,
): AxiosRequestConfig {
  if (!config2) {
    config2 = {};
  }

  const config = Object.create(null);

  for (const key in config2) {
    mergeField(key);
  }

  for (const key in config1) {
    if (!config2[key]) {
      mergeField(key);
    }
  }
  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat;
    config[key] = strat(config1[key], config2[key]);
  }

  return config;
}
