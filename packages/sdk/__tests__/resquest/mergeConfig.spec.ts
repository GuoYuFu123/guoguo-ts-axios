import axios from '../../src';
import { BASE_URL } from './config';
import { Res } from './types/response';

describe('mergeConfig', () => {
  it('should merge common to config', async () => {
    axios.defaults.headers.common['test'] = '123';
    axios.defaults.timeout = 2000;

    const res = await axios<Res>({
      url: `${BASE_URL}/api/axios/extend/post`,
      method: 'post',
    });

    expect(res.data.status).toBe(200);
    expect(res.config.headers['test']).toBe('123');
    expect(res.config.timeout).toBe(2000);
  });

  it('should merge value to common', async () => {
    axios.defaults.headers.common['test'] = '123';
    axios.defaults.timeout = 2000;

    const res = await axios<Res>({
      url: `${BASE_URL}/api/axios/extend/post`,
      headers: {
        test: '1234',
      },
      method: 'post',
    });

    expect(res.data.status).toBe(200);
    expect(res.config.headers['test']).toBe('1234');
    expect(res.config.timeout).toBe(2000);
  });
});
