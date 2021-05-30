import { defineComponent } from 'vue';
import axios, { AxiosError } from 'guoguo-ts-axios/src';
import qs from 'qs';
// import axios from 'axios';

export default defineComponent({
  setup: () => {
    axios
      .get('/api/axios/base/get', {
        params: new URLSearchParams({ a: '2' }),
        // paramsSerializer(params) {
        //   return qs.stringify(params, { arrayFormat: 'brackets' });
        // },
      })
      .then(res => {
        console.log(res);
      })
      .catch(function (e: AxiosError) {
        console.log(e.message);
      });

    return () => (
      <>
        <span>title: parseSerializer test</span>
      </>
    );
  },
});
