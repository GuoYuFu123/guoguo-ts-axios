import { defineComponent } from 'vue';
import axios from 'guoguo-ts-axios/src';

export default defineComponent({
  setup: () => {
    axios({
      url: '/api/axios/extend/post',
      method: 'post',
      data: {
        msg: 'hi',
      },
    });

    axios('/api/axios/extend/post', {
      method: 'post',
      data: {
        msg: 'hi',
      },
    });

    return () => (
      <>
        <span>title: overload test</span>
      </>
    );
  },
});
