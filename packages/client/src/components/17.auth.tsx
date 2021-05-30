import { defineComponent } from 'vue';
import axios from 'guoguo-ts-axios/src';
// import axios from 'axios';

export default defineComponent({
  setup: () => {
    // 模拟服务端动态种cookie
    document.cookie = 'XSRF-TOKEN=abcde12345';

    axios
      .get('/api/axios/base/get', {
        auth: {
            username: 'Yee',
            password: '123456',
          }
      })
      .catch(function (e) {});

    return () => (
      <>
        <span>title: auth test</span>
      </>
    );
  },
});
