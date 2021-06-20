import { defineComponent } from 'vue';
import axios from 'guoguo-ts-axios';

//https://juejin.cn/post/6973812686584807432
export default defineComponent({
  name: 'test-withCredentials',
  
  setup() {
    // 1、通过拦截器来实现
    axios.interceptors.response.use(null as any, (err) => {
      console.log(err, 1232);
    })

    axios({
      url: 'http://a.fgy.com:8088/test',
      timeout: 200,
    })

    return {};
  },
  render() {
    return <div>test-retry</div>;
  },
});
