import axios from '../../src';
import { BASE_URL } from './config';
import { Res } from './types/response';

describe('auth', () => {
  const auth = {
    username: 'guoguo',
    password: '123456',
  };
  const authorization = 'Basic ' + btoa(auth.username + ':' + auth.password);
  it('should auth', done => {
    axios<Res>({
      method: 'get',
      url: `${BASE_URL}/api/axios/headers/get`,
      auth,
    }).then(res => {
      expect(res.status).toBe(200);
      expect(res.data.data.authorization).toBe(authorization);
      done();
    });
  });
});
