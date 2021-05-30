import cookie from '../../src/helpers/cookie';

describe('helpers:cookie', () => {
  it('should read cookies', () => {
    document.cookie = 'foo=123';
    expect(cookie.read('foo')).toBe('123');
  });

  it('should not exist',() => {
    document.cookie = 'foo=123';
    expect(cookie.read('bar')).toBeNull();
  })
});
