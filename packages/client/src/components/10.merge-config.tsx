import { defineComponent } from 'vue';
import qs from 'qs';
import axios, { AxiosError } from 'guoguo-ts-axios/src';

export default defineComponent({
  setup: () => {
    axios.defaults.headers.common['test'] = 123;
    axios.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded';
    axios.defaults.timeout = 2000;


    axios({
      url: '/api/axios/extend/post',
      method: 'post',
      data: qs.stringify({
        msg: 'hi',
      }),
    })
      .then(res => {
        console.log(res);
      })
      .catch((err: AxiosError) => {
        console.log(err, 'err');
      });

    return () => (
      <>
        <span>title: merge config test</span>
      </>
    );
  },
});
