import { defineComponent } from 'vue';
import axios from 'guoguo-ts-axios/src';
// import axios from 'axios';

export default defineComponent({
  setup: () => {
    // 模拟服务端动态种cookie
    document.cookie = 'XSRF-TOKEN=abcde12345';

    axios
      .get('/api/axios/base/get', {
        xsrfCookieName: 'XSRF-TOKEN', // default
        xsrfHeaderName: 'X-XSRF-TOKEN', // default
      })
      .catch(function (e) {});

    return () => (
      <>
        <span>title: cancel test</span>
      </>
    );
  },
});
