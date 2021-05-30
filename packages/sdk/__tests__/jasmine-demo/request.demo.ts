import axios from '../../src';
import { getAjaxRequest } from './__helpers';

describe('requests', () => {
  beforeEach(() => {
    jasmine.Ajax.install();
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  it('should single string as url', () => {
    axios('/api/axios/base/get');

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/api/axios/base/get');
      expect(request.method).toBe('GET');
    });
  });
});
