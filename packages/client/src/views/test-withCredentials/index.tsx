import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'test-withCredentials',
  
  setup() {
    document.cookie='local=local';
    // 同源
    // axios({
    //     url:'http://fgy:3090/api/axios/headers/get',
    //     withCredentials: true
    // })

    axios({
      url: 'http://a.fgy.com:8088/test',
      withCredentials: true
    })

    return {};
  },
  render() {
    return <div>test-withCredentials</div>;
  },
});
