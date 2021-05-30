import { Res } from './types/response';
import axios from '../../src';
import { BASE_URL } from './config';

describe('overload', () => {
  it('should axios cb 200', async () => {
    const res = await axios<Res>({
      url: `${BASE_URL}/api/axios/extend/post`,
      method: 'post',
      data: {
        msg: 'hi',
      },
    });

    expect(res.data.status).toBe(200);
  });

  it('should overload cb 200', async () => {
    const res = await axios<Res>(`${BASE_URL}/api/axios/extend/post`,{
      method: 'post',
      data: {
        msg: 'hi',
      },
    });

    expect(res.data.status).toBe(200);
  });
});
