import { defineComponent } from 'vue';
import axios from 'guoguo-ts-axios/src';

/**
 * 基础
 */
export default defineComponent({

  setup: () => {

    axios({
      method: 'get',
      url: 'api/axios/base/get',
      params: {
        a: [1,2],
        b: 2,
        c: new Date()
      },
    });

    return () => (
      <>
        <span>title: base test</span>
      </>
    );
  },
});
