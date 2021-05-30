import axios from '../../src';
import { AxiosError } from '../../src/helpers/error';
import { BASE_URL } from './config';
import { Res } from './types/response';

describe('request', () => {
  it('should get callback status', async () => {
    const res = await axios<Res>({
      url: `${BASE_URL}/api/axios/base/get`,
      responseType: 'json',
    });
    expect(res.config.method).toBe('get');
    expect(res.status).toBe(200);
  });

  it('should get params', async () => {
    const params = { a: 1, b: { c: 3 }, d: '' };
    const res = await axios<Res>({
      url: `${BASE_URL}/api/axios/base/get`,
      params,
    });
    expect(res.data.data.a).toEqual('1');
  });

  it('should post data', async () => {
    const data = { a: 1, b: { c: 3 }, d: '' };
    const res = await axios<Res>({
      url: `${BASE_URL}/api/axios/base/post`,
      data,
      method: 'post',
    });

    expect(res.config.method).toBe('post');
    expect(res.data.status).toBe(200);
  });

  it('should headers content-type', done => {
    axios<Res>({
      method: 'post',
      url: `${BASE_URL}/api/axios/base/post`,
      headers: {
        'content-type': 'application/json;charset=utf-8',
      },
      data: {
        a: 1,
      },
    }).then(res => {
      expect(res.data.status).toBe(200);
      done();
    });
  });

  it('should error', done => {
    axios<Res>({
      method: 'get',
      url: `${BASE_URL}/api/axios/error/get`,
      timeout: 2000,
    })
      .then(res => {
        console.log(res);
        // expect(res.data.status).toBe(200);
        done();
      })
      .catch((error: AxiosError) => {
        expect(error).toBeInstanceOf(Error);
        done();
      });
  });
});
