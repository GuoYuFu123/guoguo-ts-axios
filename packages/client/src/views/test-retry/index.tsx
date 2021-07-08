import { defineComponent } from 'vue';
import axios, { AxiosRequestConfig, AxiosResponse } from 'guoguo-ts-axios/src';

//https://juejin.cn/post/6973812686584807432
export default defineComponent({
  name: 'test-withCredentials',

  setup() {
    // 1、通过拦截器来实现
    axios.interceptors.response.use(null as any, err => {
      const config = err.config;
      if (!config || !config.retryTimes) {
        return Promise.reject(err);
      }

      const { __retryCount = 0, retryTimes = 0, retryDelay = 3000 } = config;
      // 在请求对象上设置重试次数
      config.__retryCount = __retryCount;
      // 判断是否超过了重试次数
      if (__retryCount >= retryTimes) {
        return Promise.reject(err);
      }
      // 增加重试次数
      config.__retryCount++;

      // 延时处理
      const delay = new Promise(resolve => {
        setTimeout(resolve, retryDelay);
      });
      // 重新发起请求
      return delay.then(function () {
        return axios(config);
      });
    });
    axios({
      url: 'api/axios/base/get',
      params: { a: 1 },
      retryDelay: 3000, // 拦截器
      retryTimes: 3, //拦截器
    }).then(res => {
      console.log(res);
    });


    // 2、 通过适配器进行
    function retryAdapterEnhancer(adapter, options) {
      const { times = 0, delay = 300 } = options;

      return async (config:AxiosRequestConfig) => {
        const { retryTimes = times, retryDelay = delay } = config;
        let __retryCount = 0;
        const request = async ():Promise<AxiosResponse> => {
          try {
            return await adapter(config);
          } catch (err) {
            // 判断是否进行重试
            if (!retryTimes || __retryCount >= retryTimes) {
              return Promise.reject(err);
            }
            __retryCount++; // 增加重试次数
            // 延时处理
            const delay = new Promise(resolve => {
              setTimeout(resolve, retryDelay);
            });
            // 重新发起请求
            return delay.then(() => {
              return request();
            });
          }
        };
        return request();
      };
    }
    axios({
      url: 'api/axios/base/get',
      params: { a: 1 },
      adapter: retryAdapterEnhancer(axios.defaults.adapter, {
        times: 3,
        delay: 3000,
      }), // 适配器
    }).then(res => {
      console.log(res);
    });

    return {};
  },
  render() {
    return <div>test-retry</div>;
  },
});
