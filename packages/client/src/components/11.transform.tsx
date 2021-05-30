import { defineComponent } from 'vue';
import qs from 'qs';
import axios, { AxiosError } from 'guoguo-ts-axios/src';

export default defineComponent({
  setup: () => {
    axios.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded';
    axios.defaults.timeout = 2000;

    axios({
      url: '/api/axios/extend/post',
      method: 'post',
      headers: {
        test: '',
      },
      data:{
        msg: 'hi',
      },
      transformRequest: [
        function (data) {
          return qs.stringify({...data, test: 2});
        },
      ],
      transformResponse: [ 
        function (data) {
         
          if (typeof data === 'object') {
            data.b = 2;
          } else {
            const d = JSON.parse(data);
            d.data.test2 = 333
            data = d
          }
          return data;
        },
      ],
    })
      .then(res => {
        console.log(res.data);
      })
      .catch((err: AxiosError) => {
        console.log(err, 'err');
      });

    return () => (
      <>
        <span>title: transform test</span>
      </>
    );
  },
});
