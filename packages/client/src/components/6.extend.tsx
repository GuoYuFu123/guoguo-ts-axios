import { defineComponent } from 'vue';
import axios, { AxiosError } from 'guoguo-ts-axios/src';

export default defineComponent({
  setup: () => {

    axios({
      url: '/api/axios/extend/post',
      method: 'post',
      data: {
        msg: 'hi',
      },
    });

    axios.request({
      url: '/api/axios/extend/post',
      method: 'post',
      data: {
        msg: 'hello',
      },
    });

    axios.get('/api/axios/extend/get');

    axios.options('/api/axios/extend/options');

    axios.delete('/api/axios/extend/delete');

    axios.head('/api/axios/extend/head');

    axios.post('/api/axios/extend/post', { msg: 'post' });

    axios.put('/api/axios/extend/put', { msg: 'put' });

    axios.patch('/api/axios/extend/patch', { msg: 'patch' });

    return () => (
      <>
        <span>title: extend test</span>
      </>
    );
  },
});
