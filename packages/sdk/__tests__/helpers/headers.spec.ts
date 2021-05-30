import { parseHeaders, processHeaders } from '../../src/helpers/headers';

describe('helpers:header', () => {
  describe('parseHeaders', () => {
    it('should parse headers', () => {
      const headers =
        'Content-Type: application/json\r\n' +
        'Connection: keep-alive\r\n' +
        'Transfer-Encoding: chunked\r\n' +
        'Date: Tue, 21 May 2019 09:23:44 GMT\r\n' +
        ':aa\r\n' +
        'key:';
      const parsed = parseHeaders(headers);
      expect(parsed['content-type']).toBe('application/json');
      expect(parsed['connection']).toBe('keep-alive');
      expect(parsed['transfer-encoding']).toBe('chunked');
      expect(parsed['date']).toBe('Tue, 21 May 2019 09:23:44 GMT');
      expect(parsed['key']).toBe('');
    });
    it('should return enpty object', () => {
      expect(parseHeaders('')).toEqual({});
    });
  });

  describe('processHeaders', () => {
    it('should normalize content-type case', () => {
      const headers: any = {
        'content-type': 'application',
        'Content-length': 1024,
      };
      processHeaders(headers, {});
      expect(headers['Content-Type']).toBe('application');
      expect(headers['content-type']).toBeUndefined();
      expect(headers['Content-length']).toBe(1024);
    });
    it('should set content-type if not set and data is plain object', () => {
      const headers: any = {};
      processHeaders(headers, { a: 1 });
      expect(headers['Content-Type']).toBe('application/json;charset=utf-8');
    });
    it('should not set if data is not plain object', () => {
      const headers: any = {};
      processHeaders(headers, new URLSearchParams('a=2'));
      expect(headers['Content-Type']).toBeUndefined();
    });
    it('should not if headers is null or undefined', () => {
      expect(processHeaders(null, {})).toBeNull();
      expect(processHeaders(undefined, {})).toBeUndefined();
    });
  });
});
