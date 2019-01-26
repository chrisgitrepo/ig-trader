'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUndefined = exports.isFunction = undefined;
exports.publicEncrypt = publicEncrypt;
exports.get = get;
exports.getOption = getOption;
exports.transformResponse = transformResponse;
exports.transformError = transformError;
exports.uniqueId = uniqueId;

var _pidcrypt = require('./pidcrypt');

var _pidcrypt2 = _interopRequireDefault(_pidcrypt);

var _rambda = require('rambda');

var _pidcrypt_util = require('./pidcrypt/pidcrypt_util');

require('./pidcrypt/asn1');

require('./pidcrypt/rsa');

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RSA = _pidcrypt2.default.RSA,
    ASN1 = _pidcrypt2.default.ASN1;


var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

var isFunction = exports.isFunction = (0, _rambda.pipe)(_rambda.type, (0, _rambda.equals)('Function'));
var isUndefined = exports.isUndefined = (0, _rambda.pipe)(_rambda.type, (0, _rambda.equals)('Undefined'));

function publicEncrypt(key, value) {
  var asn = ASN1.decode((0, _pidcrypt_util.toByteArray)((0, _pidcrypt_util.decodeBase64)(key)));
  var rsa = new RSA();
  rsa.setPublicKeyFromASN(asn.toHexTree());
  return (0, _pidcrypt_util.encodeBase64)((0, _pidcrypt_util.convertFromHex)(rsa.encrypt(value)));
}

function get(inputObject, inputPath, defaultValue) {
  var inputValue = (0, _rambda.path)(inputPath, inputObject);
  return isUndefined(inputValue) ? defaultValue : inputValue;
}

function getOption(key, options, defaults) {
  return get(options, key, (0, _rambda.path)(key, defaults));
}

function transformResponse(response) {
  return (0, _rambda.path)('data', response);
}

function transformError(error) {
  throw (0, _error2.default)(error);
}

function uniqueId() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 15;
  var chars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CHARS;

  var i = void 0,
      result = '';
  for (i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}