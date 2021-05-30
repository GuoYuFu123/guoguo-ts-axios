import { transformRequest, transformResponse } from '../../src/helpers/data';

describe('helpers:data', () => {
  describe('transformRequest', () => {
    it('should plain object', () => {
      const a = { a: 1 };
      expect(transformRequest(a)).toBe('{"a":1}');
    });
    it('should not work is not plain object', () => {
      const a = new URLSearchParams('a=b');
      expect(transformRequest(a)).toBe(a);
    });
  });

  describe('transformResponse', () => {
    it('should object json', () => {
      const a = '{"a":2}';
      expect(transformResponse(a)).toEqual({ a: 2 });
    });

    it('should not json error', () => {
      const a = '{a:2}';
      expect(transformResponse(a)).toBe('{a:2}');
    });

    it('should not transtorm if data is not string', () => {
      const a = { a: 2 };
      expect(transformResponse(a)).toBe(a);
    });
  });
});
