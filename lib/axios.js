'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.setHeaderTokens = setHeaderTokens;

var _axios = require('axios');

var _rambda = require('rambda');

var appToken = (0, _rambda.path)('headers.x-security-token');
var clientToken = (0, _rambda.path)('headers.cst');

function create(apiKey, isDemo) {
  return (0, _axios.create)({
    baseURL: 'https://' + (isDemo ? 'demo-' : '') + 'api.ig.com/gateway/deal/',
    headers: {
      'Accept': 'application/json; charset=UTF-8',
      'Content-Type': 'application/json; charset=UTF-8',
      'X-IG-API-KEY': apiKey
    }
  });
}

function setHeaderTokens(instance, response) {
  instance.defaults.headers['X-SECURITY-TOKEN'] = appToken(response);
  instance.defaults.headers['CST'] = clientToken(response);
}

exports.default = create;