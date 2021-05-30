import { defineComponent } from 'vue';
import axios, { AxiosError } from 'guoguo-ts-axios/src';
// import axios, { AxiosError } from 'axios';

interface Response<T> {
  data: T;
  status: number;
}
interface Data {
  msg: string;
}

export default defineComponent({
  setup: () => {
    axios.interceptors.request.use(config => {
      config.headers.test += '1';
      return config;
    });
    const interceptorReq = axios.interceptors.request.use(config => {
      config.headers.test += '2';
      return config;
    });
    axios.interceptors.request.use(config => {
      console.log(config, 'config');
      config.headers.test += '3';
      return config;
    });

    axios.interceptors.response.use(res => {
      console.log(res, 'data');
      res.data.data.msg += '1';
      return res;
    });
    const interceptorRes = axios.interceptors.response.use(res => {
      res.data.data.msg += '2';
      return res;
    });

    // 取消
    axios.interceptors.request.eject(interceptorReq);
    axios.interceptors.response.eject(interceptorRes);

    axios<Response<Data>>({
      url: '/api/axios/extend/post',
      method: 'post',
      headers: {
        // test: '',
      },
      data: {
        msg: 'hi',
      },
    })
      .then(res => {
        // console.log(res.data.status);
        console.log(res.data.data);
        // console.log(res.data.data.msg);
      })
      .catch((err: AxiosError) => {
        console.log(err, 'err');
      });

    return () => (
      <>
        <span>title: genericity test</span>
      </>
    );
  },
});
