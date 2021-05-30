import {
  buildURL,
  isURLSameOrigin,
  isAbsoluteURL,
  combineURL,
} from '../../src/helpers/url';

describe('helpers:url', () => {
  describe('buildURL', () => {
    it('should null params', () => {
      expect(buildURL('/foo')).toBe('/foo');
    });

    it('should params', () => {
      expect(
        buildURL('/foo', {
          foo: 'bar',
        }),
      ).toBe('/foo?foo=bar');
    });

    it('should params ignore null', () => {
      expect(
        buildURL('/foo', {
          foo: 'bar',
          bar: null,
        }),
      ).toBe('/foo?foo=bar');
    });

    it('should param null or undefined', () => {
      expect(
        buildURL('/foo', {
          foo: null,
          bar: undefined,
        }),
      ).toBe('/foo');
    });

    it('should params is object', () => {
      expect(
        buildURL('/foo', {
          foo: {
            bar: 'baa',
          },
        }),
      ).toBe(`/foo?foo=${encodeURI(JSON.stringify({ bar: 'baa' }))}`);
    });

    it('should params is date', () => {
      const date = new Date();
      expect(
        buildURL('/foo', {
          date,
        }),
      ).toBe(`/foo?date=${date.toISOString()}`);
    });

    it('should params is array', () => {
      expect(
        buildURL('/foo', {
          foo: ['a', 'b'],
        }),
      ).toBe(`/foo?foo[]=a&foo[]=b`);
    });

    it('should params char', () => {
      expect(
        buildURL('/foo', {
          foo: '@:$, ',
        }),
      ).toBe('/foo?foo=@:$,+');
    });

    it('should hash', () => {
      expect(
        buildURL('/foo?foo=bar#hash', {
          baz: 'bar',
        }),
      ).toBe('/foo?foo=bar&baz=bar');
    });

    it('should use serializer if provided', () => {
      const serializer = jest.fn(params => {
        return 'foo=bar';
      });

      const params = { foo: 'bar' };
      expect(buildURL('/foo', params, serializer)).toBe('/foo?foo=bar');
      // 断言函数被调用1次
      expect(serializer).toHaveBeenCalled();
      // 断言函数被调用1次
      expect(serializer).toHaveBeenCalledTimes(1);
      // 断言函数的参数为params
      expect(serializer).toHaveBeenCalledWith(params);
    });

    it('should URLSearchParams', () => {
      expect(buildURL('/foo', new URLSearchParams('bar=baz'))).toBe(
        '/foo?bar=baz',
      );
    });
  });

  describe('isURLSameOrigin', () => {
      it('should same origin', () => {
        expect(isURLSameOrigin(window.location.href)).toBeTruthy();
      });
      it('should diff origin', () => {
        expect(isURLSameOrigin('https://www.baidu.com')).toBeFalsy()
      });
  });

  describe('isAbsoluteURL', () => {
      it('should schema valid', () => {
        expect(isAbsoluteURL('https://www.baidu.com')).toBeTruthy();
        expect(isAbsoluteURL('guoguo://www.baidu.com')).toBeTruthy();
        expect(isAbsoluteURL('HTTP://www.baidu.com')).toBeTruthy();
      });
      test('should invalid scheme name', () => {
        expect(isAbsoluteURL('123://guoguo.com/')).toBeFalsy()
        expect(isAbsoluteURL('!valid://guoguo.com/')).toBeFalsy()
      })
  
      test('should return true if URL is protocol-relative', () => {
        expect(isAbsoluteURL('//example.com/')).toBeTruthy()
      })
  
      test('should return false if URL is relative', () => {
        expect(isAbsoluteURL('/foo')).toBeFalsy()
        expect(isAbsoluteURL('foo')).toBeFalsy()
      })
  });

  describe('combineURL', () => {
    test('should combine URL', () => {
      expect(combineURL('https://guoguo.com', '/users')).toBe('https://guoguo.com/users')
    })

    test('should remove duplicate slashes', () => {
      expect(combineURL('https://guoguo.com/', '/users')).toBe('https://guoguo.com/users')
    })

    test('should insert missing slash', () => {
      expect(combineURL('https://guoguo.com', 'users')).toBe('https://guoguo.com/users')
    })

    test('should not insert slash when relative url missing/empty', () => {
      expect(combineURL('https://guoguo.com/users', '')).toBe('https://guoguo.com/users')
    })

    test('should allow a single slash for relative url', () => {
      expect(combineURL('https://guoguo.com/users', '/')).toBe('https://guoguo.com/users/')
    })
  });
});
