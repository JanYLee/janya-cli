'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.set = exports.get = exports.getAll = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _util = require('util');

var _ini = require('ini');

var _Configuation = require('./Configuation.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var exits = (0, _util.promisify)(_fs2.default.exists);
var readFile = (0, _util.promisify)(_fs2.default.readFile);
var writeFile = (0, _util.promisify)(_fs2.default.writeFile);

var getAll = exports.getAll = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var exit, opts;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return exits(_Configuation.RC);

          case 2:
            exit = _context.sent;

            if (exit) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', _Configuation.DEFAULTS);

          case 5:
            _context.next = 7;
            return readFile(_Configuation.RC, 'utf8');

          case 7:
            opts = _context.sent;

            opts = (0, _ini.decode)(opts);
            return _context.abrupt('return', opts);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getAll() {
    return _ref.apply(this, arguments);
  };
}();

var get = exports.get = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(key) {
    var exit, opts;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return exits(_Configuation.RC);

          case 2:
            exit = _context2.sent;

            if (exit) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt('return', '');

          case 5:
            _context2.next = 7;
            return readFile(_Configuation.RC, 'utf8');

          case 7:
            opts = _context2.sent;

            opts = (0, _ini.decode)(opts);
            return _context2.abrupt('return', opts[key]);

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function get(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var set = exports.set = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(key, value) {
    var exit, opts;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (key) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt('return', console.log(_chalk2.default.red(_chalk2.default.bold('Error:')), _chalk2.default.red('key is required')));

          case 2:
            if (value) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt('return', console.log(_chalk2.default.red(_chalk2.default.bold('Error:')), _chalk2.default.red('value is required')));

          case 4:
            _context3.next = 6;
            return exits(_Configuation.RC);

          case 6:
            exit = _context3.sent;
            opts = void 0;

            if (!exit) {
              _context3.next = 16;
              break;
            }

            _context3.next = 11;
            return readFile(_Configuation.RC, 'utf8');

          case 11:
            opts = _context3.sent;

            opts = (0, _ini.decode)(opts);
            opts = Object.assign(opts, _defineProperty({}, key, value));
            _context3.next = 17;
            break;

          case 16:
            opts = Object.assign(_Configuation.DEFAULTS, _defineProperty({}, key, value));

          case 17:
            _context3.next = 19;
            return writeFile(_Configuation.RC, (0, _ini.encode)(opts), 'utf8');

          case 19:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function set(_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

var remove = exports.remove = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(key) {
    var exit, opts;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return exits(_Configuation.RC);

          case 2:
            exit = _context4.sent;

            if (!exit) {
              _context4.next = 12;
              break;
            }

            opts = void 0;
            _context4.next = 7;
            return readFile(_Configuation.RC, 'utf8');

          case 7:
            opts = _context4.sent;

            opts = (0, _ini.decode)(opts);
            delete opts[key];
            _context4.next = 12;
            return writeFile(_Configuation.RC, (0, _ini.encode)(opts), 'utf8');

          case 12:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function remove(_x4) {
    return _ref4.apply(this, arguments);
  };
}();