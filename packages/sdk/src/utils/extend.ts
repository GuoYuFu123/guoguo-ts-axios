/**
 * @description 扩展
 * @param to
 * @param from
 * @returns to & from
 */
export function extend<T, U>(to: T, from: U): T & U {  
  for (const key in from) {
    (to as T & U)[key] = from[key] as any;
  }
  return to as T & U;
}
