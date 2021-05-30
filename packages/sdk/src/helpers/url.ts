import { isDate, isPlainObject, isURLSearchParams } from '../utils';

// 对某些特殊字符不进行encode
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

// /api/axios/get?a=1  {a:1, b : [1,2,], v: ' ' }
export function buildURL(
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string,
) {
  if (!params) {
    return url;
  }

  let serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    const parts: string[] = [];
    Object.keys(params).forEach(key => {
      let val = params[key];
      // 判空
      //https://stackoverflow.com/questions/10790300/should-i-use-typeofval-undefined-or-val-undefined
      if (val === null || typeof val === 'undefined') {
        return;
      }

      // 格式化数据 key|key[] : [val]
      let values: string[];
      if (Array.isArray(val)) {
        values = val;
        key += '[]';
      } else {
        values = [val];
      }

      // 对数据进行encode
      values.forEach(val => {
        if (isDate(val)) {
          val = val.toISOString();
        } else if (isPlainObject(val)) {
          val = JSON.stringify(val);
        }
        parts.push(`${encode(key)}=${encode(val)}`);
      });
    });

    //  对2个以上的参数进行序列化拼接
    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    const markIndex = url.indexOf('#');
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }
  return url;
}

/**
 * 同域名的判断主要利用了一个技巧，创建一个 a 标签的 DOM，然后设置 href 属性为我们传入的 url，然后可以获取该 DOM 的 protocol、host。当前页面的 url 和请求的 url 都通过这种方式获取，然后对比它们的 protocol 和 host 是否相同即可。
 */
interface URLOrigin {
  protocol: string;
  host: string;
}
const urlParsingNode = document.createElement('a');
const currentOrigin = resolveURL(window.location.href);

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url);
  const { protocol, host } = urlParsingNode;

  return {
    protocol,
    host,
  };
}
export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL);
  return (
    parsedOrigin.protocol === currentOrigin.protocol &&
    parsedOrigin.host === currentOrigin.host
  );
}

// 是不是特殊协议的绝对路径
export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}

// 将最后的/ 和 最前面的/ 替换掉
export function combineURL(baseURL: string, relativeURL: string): string {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}
