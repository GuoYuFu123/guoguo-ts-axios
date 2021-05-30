import { defineComponent } from 'vue';
import axios from 'guoguo-ts-axios/src';

export default defineComponent({
  setup: () => {

    axios.get(
      'https://imgcps.jd.com/img-cubic/creative_server_cia/v1/FocusFullshop/CkFqZnMvdDEvMTc1MDQyLzYvOTIzNC83Mzc0Mi82MDljMzI5M0UyOTEwODhmYi9jNTBiNTVkYTQ3Yjk0ZWNlLmpwZxIKOTk5LXR5XzBfMTABOO6Leg/cr/s/q.jpg',
      {
        onDownloadProgress(progressEvent: ProgressEvent) {
          // 监听下载进度
          const { total, loaded } = progressEvent;
          console.log(`已经下载 ${loaded / total}`);
        },
      },
    ).then(res=> {
      console.log(res, 'down')
    });

    const uploadFile = (e: Event) => {
      console.log('upload', e.target);
      const target = e.target as HTMLInputElement;
      const data = new FormData();
      console.log(target.files);
      if (target.files) {
        data.append('file', target.files[0]);

        axios.post('/api/axios/upload/post', data, {
          onUploadProgress(progressEvent: ProgressEvent) {
            console.log(progressEvent, 'upload');
            // 监听上传进度
          },
        });
      }
    };

    return () => (
      <>
        <span>title: cancel test</span>

        <input id="file" type="file" onChange={uploadFile}>
          上传
        </input>
      </>
    );
  },
});
