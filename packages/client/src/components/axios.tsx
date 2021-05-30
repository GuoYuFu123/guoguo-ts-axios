import { defineComponent } from 'vue';
import axios from 'axios';

/**
 * axios 示例
 */
export default defineComponent({
  setup: () => {
    axios.interceptors.request.use(
      config => {
        console.log('axios-config11', config);
        config.headers['a'] += '11';
        return config;
      },
      error => {
        Promise.reject(error);
      },
    );

    axios.interceptors.request.use(
      config => {
        console.log('axios-config33', config);
        config.headers['a'] = '22';
        config.headers['b'] = '22';
        config.headers['c'] = '22';
        return config;
      },
      error => {
        Promise.reject(error);
      },
    );

    axios.interceptors.response.use(
      response => {
        console.log('axios-response11', response);
        return response.data;
      },
      error => {
        return Promise.reject(error);
      },
    );
    axios.interceptors.response.use(
      response => {
        console.log('axios-response22', response);
        return response.data;
      },
      error => {
        return Promise.reject(error);
      },
    );

    axios({
      method: 'get',
      url: 'api/axios/base/get',
      params: {
        a: [1, 2],
        b: 2,
        c: new Date(),
      },
      headers: {
        a: '',
      },
    });

    return () => (
      <>
        <span>title: base test</span>
      </>
    );
  },
});
