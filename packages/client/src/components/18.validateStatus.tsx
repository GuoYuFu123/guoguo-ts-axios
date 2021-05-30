import { defineComponent } from 'vue';
import axios from 'guoguo-ts-axios/src';
import { AxiosError } from '../../../sdk/src/helpers/error';
// import axios from 'axios';

export default defineComponent({
  setup: () => {
    // 模拟服务端动态种cookie
    document.cookie = 'XSRF-TOKEN=abcde12345';

    axios
      .get('/api/axios/base/get/403', {
        validateStatus(status) {
          return status >= 200 && status < 400;
        },
      })
      .then(res => {
        console.log(res);
      })
      .catch(function (e: AxiosError) {
        console.log(e.message);
      });

    axios
      .get('/api/axios/base/get/403', {
        validateStatus(status) {
          return status >= 200 && status < 500;
        },
      })
      .then(res => {
        console.log(res);
      })
      .catch(function (e: AxiosError) {
        console.log(e.message);
      });

    return () => (
      <>
        <span>title: auth test</span>
      </>
    );
  },
});
