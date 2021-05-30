//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
import * as JasmineCore from 'jasmine-core';
// @ts-ignore
global.getJasmineRequireObj = function () {
  return JasmineCore;
};
import 'jasmine-ajax';
