import { defineComponent } from 'vue';
import axios, { AxiosError } from 'guoguo-ts-axios/src';

interface Response<T> {
  data: T;
  status: number;
}
interface Data {
  msg: string;
}

export default defineComponent({
  setup: () => {
    axios<Response<Data>>({
      url: '/api/axios/extend/post',
      method: 'post',
      data: {
        msg: 'hi',
      },
    })
      .then(res => {
        console.log(res.data.status);
        console.log(res.data.data);
        console.log(res.data.data.msg);
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
