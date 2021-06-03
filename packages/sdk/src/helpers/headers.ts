import { isPlainObject } from '../utils';

//Content-Type 大小写 标准化
function normalizaHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return;
  }

  Object.keys(headers).forEach(name => {
    if (
      name !== normalizedName &&
      name.toUpperCase() === normalizedName.toUpperCase()
    ) {
      headers[normalizedName] = headers[name];
      delete headers[name];
    }
  });
}

export function processHeaders(headers: any, data: any): any {
  normalizaHeaderName(headers, 'Content-Type');

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8';
    }
  }

  return headers;
}

// 将request.getAllResponseHeaders() 数据转为对象， 分隔符：‘\n’
/**
 * 
    date: Fri, 05 Apr 2019 12:40:49 GMT
    etag: W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"
    connection: keep-alive
    x-powered-by: Express
    content-length: 13
    content-type: application/json; charset=utf-8
 */
export function parseHeaders(headers: string): any {
  const parsed: Record<string, string> = {};

  if (!headers) {
    return parsed;
  }

  headers.split('\n').forEach(line => {
    let [key, ...vals] = line.split(':');

    key = key.trim().toLowerCase();
    if (!key) {
      return;
    }
    const val = vals.join(':').trim();

    parsed[key] = val;
  });
  return parsed;
}
