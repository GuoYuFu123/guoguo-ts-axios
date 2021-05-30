import axios from '../../src';
import { AxiosError } from '../../src/helpers/error';
import { BASE_URL } from './config';
import { Res } from './types/response';

describe('validateStatus', () => {
  it('should validateStatus', done => {
    axios<Res>({
      method: 'get',
      url: `${BASE_URL}/api/axios/error/get`,
      timeout: 2000,
      validateStatus(status) {
        return status == 400;
      },
      headers: undefined
    })
      .then(res => {
        expect(res.status).toBe(400);
        done();
      })
      .catch((error: AxiosError) => {
        expect(error).toBeInstanceOf(Error);
        done();
      });
  });
});
