import { defineComponent } from 'vue';
import axios from 'guoguo-ts-axios/src';
// import { AxiosError } from '../../../sdk/src/helpers/error';
// import axios from 'axios';

export default defineComponent({
  setup: () => {
    function getA() {
      return axios.get('/api/axios/base/get', { params: { a: 1 } });
    }
    function getB() {
      return axios.post('/api/axios/base/post', {
        post: 'test',
      });
    }

    axios.all([getA(), getB()]).then(
      axios.spread(function (...args) {
        console.log(args, 'spread');
      }),
    );

    axios.race([getA(), getB()]).then(res => {
      console.log(res, 'race');
    });

    const fakeConfig = {
      baseUrl: 'https://www.baidu.com/',
      url: '/user/12345',
      params: {
        idClient: 1,
        idTest: 2,
        testString: 'thisIsATest',
      },
    };
    console.log(axios.getUri(fakeConfig), 'getUri');

    return () => (
      <>
        <span>title: base-spread-all test</span>
      </>
    );
  },
});
