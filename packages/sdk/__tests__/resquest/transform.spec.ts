// import * as qs from 'qs';
import axios from '../../src';
import { BASE_URL } from './config';
import { Res } from './types/response';
import transform from '../../src/core/transform';

describe('transform', () => {
  it('should transform request and response', async () => {
    const transfromReq = jest.fn(data => {
      return JSON.stringify({ ...data, test: 1 });
    });

    const transfromRes = jest.fn(data => {
      if (typeof data === 'string') {
        const d = JSON.parse(data);
        d.data.test += 1;
        return d;
      }
      return data;
    });

    const res = await axios<Res>({
      url: `${BASE_URL}/api/axios/extend/post`,
      method: 'post',
      data: {
        msg: '',
      },
      transformRequest: transfromReq,
      transformResponse: transfromRes,
    });
    expect(res.data.data.test).toBe(2);
    expect(transfromReq).toBeCalled();
    expect(transfromReq).toBeCalledTimes(1);
    expect(transfromRes).toBeCalled();
    expect(transfromRes).toBeCalledTimes(1);
  });

  it('should transform no fn', () => {
    const headers = {
      'content-type': 'application/json',
    };
    const data = {
      a: 1,
    };
    const fn = jest.fn(data => {
      return data;
    });
    const res = transform(data, headers, fn);
    expect(res).toEqual(data);
  });
});
