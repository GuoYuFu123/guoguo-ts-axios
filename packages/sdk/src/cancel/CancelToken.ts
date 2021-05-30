import { Canceler, CancelExecutor, CancelTokenSource } from '../types';
import Cancel from './Cancel';

interface ResolvePromise {
  (reason: Cancel): void;
}
/**
 * 主要是通过promise 的pending 状态，来实现异步分离
 * 实例化之后
 * 此时 cancelToken.promise 处于 pending 状态
 * 
 * 传入是个cb， 将cb一个cb函数回去， 调用执行cb 也就是executor的参数
 */
export default class CancelToken {
  promise: Promise<Cancel>;
  reason?: Cancel;

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise;

    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve;
    });

    executor(message => {
      if (this.reason) {
        return;
      }
      this.reason = new Cancel(message);
      // 就将promise中的pending状态变为fulfill ，xhr就then执行，取消请求，同时抛出error
      resolvePromise(this.reason);
    });
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler;
    const token = new CancelToken(c => {
      cancel = c;
    });
    return {
      cancel,
      token,
    };
  }

  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason;
    }
  }
}
