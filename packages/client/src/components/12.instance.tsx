import { defineComponent } from 'vue';
import qs from 'qs';
import axios, { AxiosError, AxiosTransformer } from 'guoguo-ts-axios/src';
// import axios, { AxiosError, AxiosTransformer } from 'axios';

export default defineComponent({
  setup: () => {
    // axios.defaults.timeout = 2000;

    const instance = axios.create({
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded',
      // },
      transformRequest: [
        function (data) {
          return qs.stringify({ ...data, test: 2 });
        },
        ...(axios.defaults.transformRequest as AxiosTransformer[]),
      ],
      transformResponse: [
        ...(axios.defaults.transformResponse as AxiosTransformer[]),
        function (data) {
          console.log('transformResponse', data);

          if (typeof data === 'object') {
            data.b = 2;
          } else {
            const d = JSON.parse(data);
            d.data.test2 = 333;
            data = d;
          }
          return data;
        },
      ],
    });
    instance.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded';

    instance({
      url: '/api/axios/extend/post',
      method: 'post',
      headers: {
        test: '',
      },
      data: {
        msg: 'hi',
      },
    })
      .then(res => {
        console.log(res.data);
      })
      .catch((err: AxiosError) => {
        console.log(err, 'err');
      });

    return () => (
      <>
        <span>title: instance test</span>
      </>
    );
  },
});
