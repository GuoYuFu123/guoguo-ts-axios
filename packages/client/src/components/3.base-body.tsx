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
    });

    const paramsString = 'q=URLUtils.searchParams&topic=api';
    const searchParams = new URLSearchParams(paramsString);
    axios({
      method: 'post',
      url: 'api/axios/base/post',
      data: searchParams,
    });

    return () => (
      <>
        <span>title: base search test</span>
      </>
    );
  },
});
