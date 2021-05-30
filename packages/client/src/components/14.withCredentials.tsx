import { defineComponent } from 'vue';
import axios from 'guoguo-ts-axios/src';
// import axios from 'axios';

export default defineComponent({
  setup: () => {
    document.cookie = 'a=oeschger';
    document.cookie = 'b=tripe';
    axios.get('/api/axios/base/get').catch(function (e) {});

    axios.post(
      'http://a.fgy:3060/api/question/sendLog',
      {
        source: 'question',
        key: 'axios',
        value: 123,
      },
      {
        withCredentials: true,
      },
    );
    axios.post(
      'http://b.fgy:3060/api/question/sendLog',
      {
        source: 'question',
        key: 'axios',
        value: 123,
      },
      {
        withCredentials: true,
      },
    );
    axios.post(
      'http://a.fuguoyu:3060/api/question/sendLog',
      {
        source: 'question',
        key: 'axios',
        value: 123,
      },
      {
        withCredentials: true,
      },
    );
    // axios.post(
    //   'http://localhost:3060/api/question/sendLog',
    //   {
    //     source: 'question',
    //     key: 'axios',
    //     value: 123,
    //   },
    //   {
    //     // headers: { 'Content-Type': 'application/json;charset=utf-8' },
    //     withCredentials: true,
    //   },
    // );

    // axios.get('http://localhost:8088/test/domain', { withCredentials: false });
    // axios.post(
    //   'http://localhost:8088/test/domain',
    //   {
    //     source: 'question',
    //     key: 'axios',
    //     value: 123,
    //   },
    //   {
    //     withCredentials: true,
    //   },
    // );

    return () => (
      <>
        <span>title: cancel test</span>
      </>
    );
  },
});
