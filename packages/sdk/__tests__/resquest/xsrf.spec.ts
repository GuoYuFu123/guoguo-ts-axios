import axios from '../../src';
import { BASE_URL } from './config';
import { Res } from './types/response';

describe('xsrf', () => {
  it('should xsrf true', done => {
    document.cookie = 'XSRF-TOKEN=abcde12345';
    axios<Res>({
      method: 'get',
      url: `${BASE_URL}/api/axios/headers/get`,
      xsrfCookieName: 'XSRF-TOKEN', // default
      xsrfHeaderName: 'X-XSRF-TOKEN', // default
    }).then(res => {
      expect(res.status).toBe(200);
      done();
    });
  });
});
