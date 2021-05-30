import axios from '../../src';
import { BASE_URL } from './config';
import { Res } from './types/response';

describe('all-spread', () => {
  it('should axios.all', done => {
    const fnA = jest.fn(() => {
      return axios.get(`${BASE_URL}/api/axios/base/get`, { params: { a: 1 } });
    });
    const fnB = jest.fn(() => {
      return axios.post(`${BASE_URL}/api/axios/base/post`, {
        post: 'test',
      });
    });
    axios.all([fnA(), fnB()]).then(
      axios.spread(function (...args) {
        expect(args).toHaveLength;
        done();
      }),
    );
  });
  it('should axios.race', done => {
    const fnA = jest.fn(() => {
      return axios.get(`${BASE_URL}/api/axios/base/get`, { params: { a: 1 } });
    });
    const fnB = jest.fn(() => {
      return axios.post(`${BASE_URL}/api/axios/base/post`, {
        post: 'test',
      });
    });
    axios.race([fnA(), fnB()]).then(res => {
      expect(res.data.status).toBe(200)
      done()
    });
  });
});
