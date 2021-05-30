import axios from '../../src';
import { AxiosError } from '../../src/helpers/error';
import { BASE_URL } from './config';
import { Res } from './types/response';

describe('withCredentials', () => {
  it('should withCredentials true', done => {
    axios<Res>({
      method: 'get',
      url: `${BASE_URL}/api/axios/base/get`,
      withCredentials: true,
    }).then(res => {
      expect(res.request.withCredentials).toBeTruthy();
      expect(res.status).toBe(200);
      done();
    });
  });
  it('should withCredentials false', done => {
    document.cookie = 'withCredentials=aaa';
    axios<Res>({
      method: 'get',
      url: `${BASE_URL}/api/axios/base/get`,
      withCredentials: false,
    }).then(res => {
      expect(res.request.withCredentials).toBeFalsy();
      expect(res.status).toBe(200);
      done();
    });
  });
});
