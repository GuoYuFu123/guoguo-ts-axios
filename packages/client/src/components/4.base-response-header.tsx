import { defineComponent } from 'vue';
import axios from 'guoguo-ts-axios/src';

export default defineComponent({
  setup: () => {
    axios({
      method: 'post',
      url: 'api/axios/base/post',
      headers: {
        'content-type': 'application/json;charset=utf-8',
      },
      data: {
        a: 1,
      },
    }).then(res => {
      console.log('res', res);
    });

    return () => (
      <>
        <span>title: response test</span>
      </>
    );
  },
});
