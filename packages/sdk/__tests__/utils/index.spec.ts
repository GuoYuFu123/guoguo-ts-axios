import {
  isDate,
  isPlainObject,
  isFormData,
  isURLSearchParams,
  extend,
  deepMerge,
  flattenHeaders,
} from '../../src/utils';

describe('utils:index', () => {
  describe('isXXX', () => {
    it('should isDate', () => {
      expect(isDate(new Date())).toBeTruthy();
      expect(isDate(Date.now())).toBeFalsy();
    });

    it('should isPlainObject', () => {
      expect(isPlainObject({})).toBeTruthy();
      expect(isPlainObject(123)).toBeFalsy();
      expect(isPlainObject('123')).toBeFalsy();
    });

    it('should isFormData', () => {
      expect(isFormData(new FormData())).toBeTruthy();
      expect(isFormData({})).toBeFalsy();
    });

    it('should isURLSearchParams', () => {
      expect(isURLSearchParams(new URLSearchParams())).toBeTruthy();
      expect(isURLSearchParams({})).toBeFalsy();
    });
  });

  describe('extend', () => {
    it('should attr null', () => {
      const a = Object.create(null);
      const b = { guoguo: '牛' };
      extend(a, b);
      expect(a.guoguo).toBe('牛');
    });

    it('should properties', () => {
      const a = { foo: 123, bar: 345 };
      const b = { bar: 678 };
      const c = extend(a, b);

      expect(c.foo).toBe(123);
      expect(c.bar).toBe(678);
    });

    it('should func', () => {
      const fnA = function () {};
      const fnB = function () {};
      fnB.prototype.getB = () => '123';

      extend(fnA, fnB);
      expect(new fnB().getB()).toBe('123');
    });
  });

  describe('deepMerge', () => {
    it('should immutable', () => {
      const a = Object.create(null);
      const b: any = { foo: 123 };
      const c: any = { bar: 456 };

      deepMerge(a, b, c);
      expect(a.foo).toBeUndefined();
      expect(a.bar).toBeUndefined();
      expect(b.bar).toBeUndefined();
      expect(c.foo).toBeUndefined();
    });

    it('should merge properties', () => {
      const a = { bar: 123 };
      const b = { foo: 456 };
      const c = { bar: 789 };

      const d = deepMerge(a, b, c);
      expect(d.bar).toBe(789);
      expect(d.foo).toBe(456);
    });

    it('should recursively', () => {
      const a = { bar: { aaa: 111 }, ccc: { aaa: 789 } };
      const b = { foo: 456, bar: { baa: 100 } };
      const c = deepMerge(a, b);

      expect(c.ccc.aaa).toBe(789);
      expect(c.foo).toBe(456);
      expect(c.bar.baa).toBe(100);
      expect(c.bar).toEqual({
        baa: 100,
        aaa: 111,
      });
      expect(c.ccc).toEqual({
        aaa: 789,
      });
    });

    it('should references remove', () => {
      const a = { bar: 123, ccc: { aaa: 789 } };
      const b = { foo: 456, bar: { baa: 100 } };
      const c = deepMerge(a, b);

      expect(c.bar).not.toBe(a.bar);
      expect(c.bar).not.toBe(b.bar);
    });

    it('should handle null undefined params', () => {
      expect(deepMerge(undefined)).toEqual({});
      expect(deepMerge(null)).toEqual({});
      expect(deepMerge(undefined, null)).toEqual({});
      expect(deepMerge(undefined, { a: 1 })).toEqual({ a: 1 });
      expect(deepMerge({ a: 1 }, undefined, null)).toEqual({ a: 1 });
    });
  });

  describe('flattenHeaders', () => {
    it('should flatten headers and include common headers', () => {
      const headers = {
        Accept: 'application/json',
        common: {
          'X-COMMON-HEADER': 'commonheader',
        },
        get: {
          'X-GET-HEADER': 'getheader',
        },
        post: {
          'X-POST-HEADER': 'postheader',
        },
      };

      expect(flattenHeaders(headers, 'get')).toEqual({
        Accept: 'application/json',
        'X-COMMON-HEADER': 'commonheader',
        'X-GET-HEADER': 'getheader',
      });
    });

    it('should flatten the header without common header', () => {
      const headers = {
        Accept: 'application/json',
        get: {
          'X-GET-HEADER': 'getheader',
        },
        post: {
          'X-POST-HEADER': 'postheader',
        },
      };
      expect(flattenHeaders(headers, 'get')).toEqual({
        Accept: 'application/json',
        'X-GET-HEADER': 'getheader',
      });
    });

    it('should flatten the header underfined null', () => {
      expect(flattenHeaders(undefined, 'get')).toBeUndefined();
      expect(flattenHeaders(null, 'get')).toBeNull();
    });
  });
});
