import { defineComponent } from 'vue';
import axios, { AxiosError } from 'guoguo-ts-axios/src';

export default defineComponent({
  setup: async () => {
    axios({
      method: 'get',
      url: 'api/axios/error/get',
      params: {
        a: 1,
      },
      data: {
        a: 1,
      },
      timeout: 3000,
    })
      .then(res => {
        console.log('res', res);
      })
      .catch((e: AxiosError) => {
        console.log(e.message);
        console.log(e.code);
        console.log(e.config);
        console.log(e.stack);
      });

    const res = await axios({
      method: 'get',
      url: 'api/axios/error/get',
      params: {
        a: 1,
      },
      data: {
        a: 1,
      },
      timeout: 3000,
    });
    console.log(res);

    return () => (
      <>
        <span>title: error test</span>
      </>
    );
  },
});
