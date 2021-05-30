import { defineComponent } from 'vue';
import axios from 'guoguo-ts-axios/src';

export default defineComponent({
  setup: () => {
    axios({
      method: 'get',
      url: 'api/axios/base/get',
      params: {
        a: 'guoguo',
        b: [1, 2],
        c: { a: 1 },
        d: new Date(),
        e: 'foo@:#',
        f: ' ',
        g: null,
        h: undefined
      },
    });

    return () => (
      <>
        <span>title: base search test</span>
      </>
    );
  },
});
