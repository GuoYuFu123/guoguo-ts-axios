const toString = Object.prototype.toString;

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]';
}

export function isPlainObject(val: any): val is object {
  return toString.call(val) === '[object Object]';
}

// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object';
// }

export function isFormData(val: any): boolean {
  return typeof val !== 'undefined' && val instanceof FormData;
}

export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams;
}
