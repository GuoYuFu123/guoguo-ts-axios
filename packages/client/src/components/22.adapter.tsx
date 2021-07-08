import { defineComponent } from 'vue';
import axios from 'guoguo-ts-axios/src';
import { AxiosRequestConfig, AxiosResponse } from 'guoguo-ts-axios/src';

export default defineComponent({
  setup: () => {
    const mockRes = {
        status: 200,
        data: {
            haha: 123456789
        }
    }
    const mockAdapter = async (config:AxiosRequestConfig): Promise<AxiosResponse> => {
        return  new Promise((resolve, reject) => {
            const response = {
                data: mockRes.data,
                status: mockRes.status,
                statusText: '',
                config,
                headers: {},
                request: {},
              };
            resolve(response)
        })

    }

    axios.get('/api/axios/base/get', { params: { a: 1 }, adapter: mockAdapter }).then(res => {
      console.log('callback', res);
    });

    return () => (
      <>
        <span>title: base-adapter test</span>
      </>
    );
  },
});
