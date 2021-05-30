import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types';
import { parseHeaders } from '../helpers/headers';
import { createError } from '../helpers/error';
import { isURLSameOrigin } from '../helpers/url';
import cookie from '../helpers/cookie';
import { isFormData } from '../utils';

/**
 * 
 * @param config 
 * 我们把整个流程分为 7 步：

创建一个 request 实例。
执行 request.open 方法初始化。
执行 configureRequest 配置 request 对象。
执行 addEvents 给 request 添加事件处理函数。
执行 processHeaders 处理请求 headers。
执行 processCancel 处理请求取消逻辑。
执行 request.send 方法发送请求。
 */

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      url,
      method = 'get',
      data = null,
      headers = {},
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus,
    } = config;

    const request = new XMLHttpRequest();

    // 建立链接
    // !可以保证url是有值的
    request.open(method.toUpperCase(), url!, true);

    configureRequest();

    addEvents();

    processHeaders();

    processCancel();
    
    request.send(data);

    function configureRequest() {
      // 如果设置了响应类型
      if (responseType) {
        request.responseType = responseType;
      }

      if (timeout) {
        request.timeout = timeout;
      }
      if (withCredentials) {
        request.withCredentials = true;
      }
      if (auth) {
        // btoa() 方法用于创建一个 base-64 编码的字符串。
        headers['Authorization'] =
          'Basic ' + btoa(auth.username + ':' + auth.password);
      }
    }

    function addEvents() {
      // 监听状态
      request.onreadystatechange = function handleLoad() {
        // 还没有完成
        if (request.readyState !== 4) {
          return;
        }

        // 当网络错误或者超时错误时，该值为0
        if (request.status === 0) {
          return;
        }

        // console.log('xhr orign response', request);
        const responseHeaders = parseHeaders(request.getAllResponseHeaders());

        const responseData =
          responseType && responseType.toLowerCase() !== 'text'
            ? request.response
            : request.responseText;

        const response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request,
        };

        handleResponse(response);
      };

      request.ontimeout = function handleTimeout() {
        reject(
          createError(
            `Timeout of ${timeout} ms exceeded`,
            config,
            'ECONNABORTED',
            request,
          ),
        );
      };

      request.onerror = function handleError() {
        reject(createError('Network Error', config, null, request));
      };

      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress;
      }
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress;
      }
    }

    function processHeaders() {
      if (isFormData(data)) {
        delete headers['Content-Type'];
      }
      // withCredentials为true或者同域请求，添加headers
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfHeaderName) {
        const xsrfValue = cookie.read(xsrfCookieName);
        if (xsrfValue) {
          headers[xsrfHeaderName] = xsrfValue;
        }
      }
      // 设置请求头，必须在open和send之前
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name];
        } else {
          request.setRequestHeader(name, headers[name]);
        }
      });
    }
    function processCancel() {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort();
          reject(reason);
        });
      }
    }

    //处理返回值
    function handleResponse(response: AxiosResponse) {
      if (!validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response,
          ),
        );
      }
    }
  });
}
