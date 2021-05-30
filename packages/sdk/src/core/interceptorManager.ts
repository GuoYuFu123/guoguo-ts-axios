import { RejectedFn, ResolvedFn } from '../types';

/**
 * 拦截器管理器
 */

interface Interceptor<T> {
  resolved: ResolvedFn<T>;
  rejected: RejectedFn;
}

export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | any>;

  constructor() {
    this.interceptors = [];
  }

  // use 接口就是添加拦截器到 interceptors 中，并返回一个 id 用于删除；
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected,
    });
    return this.interceptors.length - 1;
  }

  // forEach 接口就是遍历 interceptors 用的，它支持传入一个函数，遍历过程中会调用该函数，并把每一个 interceptor 作为该函数的参数传入；
  forEach(fn: (interception: Interceptor<T>) => void): void {
    this.interceptors.forEach(interception => {
      if (interception !== null) {
        fn(interception);
      }
    });
  }

  // eject 就是删除一个拦截器，通过传入拦截器的 id 删除
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  }
}
