'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('./axios');

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IG = function () {
  function IG(apiKey, isDemo, options) {
    _classCallCheck(this, IG);

    this.api = (0, _axios.create)(apiKey, isDemo);
    this.defaults = Object.assign({
      transformResponse: _utils.transformResponse,
      transformError: _utils.transformError
    }, options);
  }

  _createClass(IG, [{
    key: 'request',
    value: function request(method, path, version, config, options) {
      var transformRes = (0, _utils.getOption)('transformResponse', options, this.defaults);
      var transformErr = (0, _utils.getOption)('transformError', options, this.defaults);

      const headers = { Version: version || 1 };

      if (method === 'delete') {
        method = 'post'
        headers._method = 'DELETE'
      }

      var request = this.api.request(Object.assign({}, config, {
        method, url: path, headers
      }));

      if ((0, _utils.isFunction)(transformRes)) request = request.then(transformRes);
      if ((0, _utils.isFunction)(transformErr)) request = request.catch(transformErr);

      return request;
    }
  }, {
    key: 'get',
    value: function get(path, version, params, options) {
      return this.request('get', path, version, { params: params }, options);
    }
  }, {
    key: 'post',
    value: function post(path, version, data, options) {
      return this.request('post', path, version, { data: data }, options);
    }
  }, {
    key: 'put',
    value: function put(path, version, data, options) {
      return this.request('put', path, version, { data: data }, options);
    }
  }, {
    key: 'delete',
    value: function _delete(path, version, data, options) {
      return this.request('delete', path, version, { data: data }, options);
    }
  }, {
    key: 'login',
    value: function login(username, password, encryptPassword, options) {
      var _this = this;

      var encryptedPassword = encryptPassword === true;
      var processPassword = encryptedPassword ? this.get('session/encryptionKey', 1, null, {
        transformResponse: _utils.transformResponse
      }).then(function (_ref) {
        var encryptionKey = _ref.encryptionKey,
            timeStamp = _ref.timeStamp;

        return (0, _utils.publicEncrypt)(encryptionKey, password + '|' + timeStamp);
      }) : Promise.resolve(password);

      return processPassword.then(function (result) {
        return _this.post('session', 2, {
          encryptedPassword: encryptedPassword,
          identifier: username,
          password: result
        }, {
          transformResponse: false
        }).then(function (response) {
          (0, _axios.setHeaderTokens)(_this.api, response);
          var transformRes = (0, _utils.getOption)('transformResponse', options, _this.defaults);
          return (0, _utils.isFunction)(transformRes) ? transformRes(response) : response;
        });
      });
    }
  }, {
    key: 'logout',
    value: function logout(options) {
      return this.delete('session', 1, null, options);
    }
  }]);

  return IG;
}();

IG.transformResponse = _utils.transformResponse;
IG.transformError = _utils.transformError;
IG.uniqueId = _utils.uniqueId;
exports.default = IG;
module.exports = exports['default'];