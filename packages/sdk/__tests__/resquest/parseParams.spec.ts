import axios from '../../src';
import { BASE_URL } from './config';
import { Res } from './types/response';
import * as qs from 'qs';

describe('parseParams', () => {
  it('should parseParams first', done => {
    axios<Res>({
      method: 'get',
      url: `${BASE_URL}/api/axios/base/get`,
      params: {
        a: 1,
      },
      paramsSerializer: params => {
        params.b = '2';
        return qs.stringify(params);
      },
    }).then(res => {
      expect(res.data.data.b).toBe('2');
      expect(res.status).toBe(200);
      done();
    });
  });
});
