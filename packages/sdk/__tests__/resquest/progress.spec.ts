import axios from '../../src';
import { BASE_URL } from './config';
import { Res } from './types/response';

describe('progress', () => {
  it('should progress onDownloadProgress', done => {
    const onDownloadProgress = jest.fn((progressEvent: ProgressEvent) => {
      const { total, loaded } = progressEvent;
      console.log(`已经下载 ${loaded / total}`);
      console.log(progressEvent, total, loaded);
    });

    axios<Res>({
      method: 'get',
      url: `https://imgcps.jd.com/img-cubic/creative_server_cia/v1/FocusFullshop/CkFqZnMvdDEvMTc1MDQyLzYvOTIzNC83Mzc0Mi82MDljMzI5M0UyOTEwODhmYi9jNTBiNTVkYTQ3Yjk0ZWNlLmpwZxIKOTk5LXR5XzBfMTABOO6Leg/cr/s/q.jpg`,
      onDownloadProgress,
    }).then(res => {
      expect(res.status).toBe(200);
      done();
    });
  });

  it('should progress onUploadProgress', done => {
    document.body.innerHTML = ` <button id="btn">
    上传
  </button>`;
    const btnClick = jest.fn(() => {});
    document.getElementById('btn').onclick = btnClick;
    document.getElementById('btn').click();
    expect(btnClick).toBeCalled();
    expect(btnClick).toBeCalledTimes(1);

    const onUploadProgress = jest.fn((progressEvent: ProgressEvent) => {
      console.log(progressEvent, 'upload');
      // 监听上传进度
    });
    axios
      .post(
        `${BASE_URL}/api/axios/upload/post`,
        {},
        {
          onUploadProgress,
        },
      )
      .then(res => {
        expect(res.status).toBe(200);
        done();
      })
      .catch(error => {
        done();
      });
  });

  it('should post formData', done => {
    const d = new FormData();
    d.append('a', '1');
    axios
      .post(`${BASE_URL}/api/axios/upload/post`, d, {
        headers: {
          'content-type': 'multipart/form-data; ',
        },
      })
      .then(res => {
        expect(res.status).toBe(200);
        done();
      })
      .catch(error => {
        done();
      });
  });
});
