import axios, { AxiosError } from '../../src';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

describe('cancel ', () => {
  it('should source cancle', done => {
    axios
      .get(`/api/axios/base/get`, {
        cancelToken: source.token,
      })
      .catch(function (e: AxiosError) {
        if (axios.isCancel(e)) {
          expect(axios.isCancel(e)).toBeTruthy();
          expect(e.message).toBe('Operation canceled by the user.');
          done();
        }
      });

    setTimeout(() => {
      source.cancel('Operation canceled by the user.');
      source.cancel('Operation canceled by the user123.');

      axios
        .post('/api/axios/base/post', { a: 1 }, { cancelToken: source.token })
        .catch(function (e) {
          if (axios.isCancel(e)) {
            expect(axios.isCancel(e)).toBeTruthy();
            expect(e.message).toBe('Operation canceled by the user.');
            done();
          }
        });
    });
  });
});
