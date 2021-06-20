import axios from '../../src';
import { BASE_URL } from './config';
import { Res } from './types/response';

describe('extend instance', () => {
  it('should axios', async () => {
    const res = await axios<Res>({
      url: `${BASE_URL}/api/axios/extend/post`,
      method: 'post',
      data: {
        msg: 'hi',
      },
    });
    expect(res.data.status).toBe(200);
  });

  it('should axios request', async () => {
    const res = await axios.request<Res>({
      url: `${BASE_URL}/api/axios/extend/post`,
      method: 'post',
      data: {
        msg: 'hi',
      },
    });
    expect(res.data.status).toBe(200);
  });

  it('should axios.get', async () => {
    const res = await axios.get<Res>(`${BASE_URL}/api/axios/extend/get`);
    expect(res.data.status).toBe(200);
  });

  it('should axios.options', async () => {
    const res = await axios.options<Res>(
      `${BASE_URL}/api/axios/extend/options`,
    );
    expect(res.data.status).toBeUndefined();
  });

  it('should axios.delete', async () => {
    const res = await axios.delete<Res>(`${BASE_URL}/api/axios/extend/delete`);
    expect(res.data.status).toBe(200);
  });

  it('should axios.head', async () => {
    const res = await axios.head<Res>(`${BASE_URL}/api/axios/extend/head`);
    expect(res.status).toBe(200);
  });

  it('should axios.post', async () => {
    const res = await axios.post<Res>(`${BASE_URL}/api/axios/extend/post`);
    expect(res.data.status).toBe(200);
  });

  it('should axios.put', async () => {
    const res = await axios.put<Res>(`${BASE_URL}/api/axios/extend/put`);
    expect(res.data.status).toBe(200);
  });
  it('should axios.patch', async () => {
    const res = await axios.patch<Res>(`${BASE_URL}/api/axios/extend/patch`);
    expect(res.data.status).toBe(200);
  });
});
