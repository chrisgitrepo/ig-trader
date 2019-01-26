'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createError;

var _rambda = require('rambda');

var statusCode = (0, _rambda.path)('status');
var statusText = (0, _rambda.path)('statusText');
var errorCode = (0, _rambda.path)('data.errorCode');
var headers = (0, _rambda.path)('headers');
var method = (0, _rambda.path)('method');
var params = (0, _rambda.path)('params');
var data = (0, _rambda.path)('data');
var url = (0, _rambda.path)('url');

function createError(_ref) {
  var message = _ref.message,
      request = _ref.request,
      response = _ref.response,
      config = _ref.config;

  var error = new Error(message);
  error.type = response ? 'response' : request ? 'request' : 'internal';
  if (config) {
    error.url = url(config);
    error.data = data(config);
    error.params = params(config);
    error.method = method(config);
    error.headers = headers(config);
  }
  if (response) {
    error.errorCode = errorCode(response);
    error.statusCode = statusCode(response);
    error.statusText = statusText(response);
  }
  return error;
}
module.exports = exports['default'];