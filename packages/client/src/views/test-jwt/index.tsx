import { defineComponent, InputHTMLAttributes, ref } from 'vue';
import axios from 'guoguo-ts-axios';
import { AxiosPromise } from 'guoguo-ts-axios/src';
import { AxiosError } from 'guoguo-ts-axios/src/helpers/error';

const TOKEN_KEY = 'guoguo:ts:axios:jwt';

export default defineComponent({
  //   name: 'test-jwt',

  setup() {
    const username = ref<string>('guoguo');
    const password = ref<string>('guoguo');

    const getToken = () => {
      return localStorage.getItem(TOKEN_KEY);
    };
    const setToken = token => {
      if (token) localStorage.setItem(TOKEN_KEY, token);
    };
    const removeToken = () =>  {
      localStorage.removeItem(TOKEN_KEY)
    }

    // 拦截器将token放在auth的请求头中
    axios.interceptors.request.use(config => {
      const token = getToken();
      config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    });

    // 通过拦截器来实现
    axios.interceptors.response.use(res => {
      if (res.data.status === 200) {
        return res.data;
      }
      return res;
    },(err:AxiosError) => {
      if(err.response?.status === 401) {
        removeToken();
        alert(`${err.response.statusText}  去 login`)
      }
    });

    const login = async () => {
      const res = await axios({
        url: '/api/users/auth/jwt/login',
        method: 'post',
        data: {
          username: username.value,
          password: password.value,
        },
      });
      if (res.status === 200) {
        alert(`token ${res.data.token}`)
        setToken(res.data.token);
      }
    };

    const testProfile = async () => {
      const res = await axios({
        url: '/api/users/auth/jwt/profile',
        method: 'get'
      });
      alert(JSON.stringify(res.data))
    };

    return {
      username,
      password,
      login,
      testProfile,
    };
  },
  render() {
    return (
      <div>
        <h5>test-jwt</h5>
        <p>1、模拟登陆，获取token，将token存于cookie，或者localstroage中</p>
        <div>
          username:
          <input
            type="text"
            placeholder="guoguo"
            value={this.username}
            onInput={e => {
              this.username = (e.target as HTMLInputElement).value;
            }}
          />
          <br />
          password:
          <input
            type="text"
            placeholder="guoguo"
            value={this.password}
            onInput={e => {
              this.password = (e.target as HTMLInputElement).value;
            }}
          />
          <br />
          <button onClick={this.login}>登陆</button>
        </div>
        <p>2、请求校验接口</p>
        <div>
          <button onClick={this.testProfile}>请求测试jwt</button>
        </div>
      </div>
    );
  },
});
