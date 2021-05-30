import { isPlainObject } from './type';

// 后面的数据优先级高，是全合并, 同级覆盖
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null);

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key];
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val);
          } else {
            result[key] = deepMerge({}, val);
          }
        } else {
          result[key] = val;
        }
      });
    }
  });
  return result;
}
