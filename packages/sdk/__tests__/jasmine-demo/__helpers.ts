jasmine.DEFAULT_TIMEOUT_INTERVAL = 20 * 1000; // timeout 时间

// get Ajax request
export const getAjaxRequest = (function () {
  var attempts = 0;
  const MAX_ATTEMPTS = 5;
  const ATTEMPT_DELAY_FACTOR = 5;

  function getAjaxRequest(): Promise<JasmineAjaxRequest> {
    return new Promise((resolve, reject) => {
      attempts = 0;
      attemptGettingAjaxRequest(resolve, reject);
    });
  }

  function attemptGettingAjaxRequest(resolve, reject) {
    var delay = attempts * attempts * ATTEMPT_DELAY_FACTOR;

    if (attempts++ > MAX_ATTEMPTS) {
      reject(new Error('No request was found'));
      return;
    }

    setTimeout(function () {
      var request = jasmine.Ajax.requests.mostRecent();
      if (request) {
        resolve(request);
      } else {
        attemptGettingAjaxRequest(resolve, reject);
      }
    }, delay);
  }

  return getAjaxRequest;
})();
