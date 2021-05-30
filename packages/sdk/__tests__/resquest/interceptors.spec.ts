import axios from '../../src';
import { BASE_URL } from './config';
import { Res } from './types/response';

describe('interceptors', () => {
  it('should request interceptors', async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(config => {
      config.headers.test += '1';
      return config;
    });
    axiosInstance.interceptors.request.use(config => {
      config.headers.test += '2';
      return config;
    });
    axiosInstance.interceptors.request.use(config => {
      config.headers.test += '3';
      return config;
    });

    const res = await axiosInstance({
      url: `${BASE_URL}/api/axios/extend/post`,
      method: 'post',
      headers: {
        test: '',
      },
    });

    expect(res.config.headers.test).toBe('321');
  });

  it('should request interceptors eject', async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(config => {

      config.headers.test += '1';
      return config;
    });
    const intercetor2 = axiosInstance.interceptors.request.use(config => {
      config.headers.test += '2';
      return config;
    });
    axiosInstance.interceptors.request.use(config => {
      config.headers.test += '3';
      return config;
    });

    axiosInstance.interceptors.request.eject(intercetor2);

    const res = await axiosInstance<Res>({
      url: `${BASE_URL}/api/axios/extend/post`,
      method: 'post',
      headers: {
        test: '',
      },
    });

    expect(res.config.headers.test).toBe('31');
  });

  it('should response interceptor', async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.response.use(res => {
      res.data.data.msg += '1';
      return res;
    });
    axiosInstance.interceptors.response.use(res => {
      res.data.data.msg += '2';
      return res;
    });

    axiosInstance.interceptors.response.use(res => {
      res.data.data.msg += '3';
      return res;
    });

    const res = await axiosInstance<Res>({
      url: `${BASE_URL}/api/axios/extend/post`,
      method: 'post',
      data: {
        msg: '',
      },
    });
    expect(res.data.data.msg).toBe('123');
  });

  it('should response interceptor eject', async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.response.use(res => {
      res.data.data.msg += '1';
      return res;
    });
    const intercetor2 = axiosInstance.interceptors.response.use(res => {
      res.data.data.msg += '2';
      return res;
    });

    axiosInstance.interceptors.response.use(res => {
      res.data.data.msg += '3';
      return res;
    });
    axiosInstance.interceptors.response.eject(intercetor2);

    const res = await axiosInstance<Res>({
      url: `${BASE_URL}/api/axios/extend/post`,
      method: 'post',
      data: {
        msg: '',
      },
    });
    expect(res.data.data.msg).toBe('13');
  });
});
