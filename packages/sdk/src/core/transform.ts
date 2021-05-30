import { AxiosTransformer } from '../types';

export default function transtorm(
  data: any,
  headers: any,
  fns: AxiosTransformer | AxiosTransformer[],
) {
  // if (!fns) {
  //   return data;
  // }
  if (!Array.isArray(fns)) {
    fns = [fns];
  }

  fns.forEach(fn => {
    data = fn(data, headers);
  });

  return data;
}
