import { defineComponent } from 'vue';
import axios, { Canceler } from 'guoguo-ts-axios/src';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export default defineComponent({
  setup: () => {
    axios
      .get('/api/axios/base/get', {
        cancelToken: source.token,
      })
      .catch(function (e) {
        // 判断是不是由于主动取消的error
        if (axios.isCancel(e)) {
          console.log('Request canceled', e.message);
        }
      });

    setTimeout(() => {
      source.cancel('Operation canceled by the user.');

      axios
        .post('/api/axios/base/post', { a: 1 }, { cancelToken: source.token })
        .catch(function (e) {
          if (axios.isCancel(e)) {
            console.log(e.message);
          }
        });
    }, 100);

    // let cancel: Canceler;

    // axios
    //   .get('/api/axios/base/get', {
    //     cancelToken: new CancelToken(c => {
    //       cancel = c;
    //     }),
    //   })
    //   .catch(function (e) {
    //     if (axios.isCancel(e)) {
    //       console.log('Request canceled', e);
    //     }
    //   });

    // setTimeout(() => {
    //   cancel('test');
    // }, 200);
    return () => (
      <>
        <span>title: cancel test</span>
      </>
    );
  },
});
