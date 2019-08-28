'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _Api = require('./utils/Api');

var api = _interopRequireWildcard(_Api);

var _Configuation = require('./utils/Configuation');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getAndInitProject = function getAndInitProject(_ref) {
  var templateName = _ref.templateName,
      projectName = _ref.projectName,
      description = _ref.description,
      author = _ref.author;

  var loading = (0, _ora2.default)('downloading template ...');
  loading.start();
  api.downloadLocal(templateName, projectName).then(function () {
    loading.succeed();
    var fileName = projectName + '/package.json';
    if (_fs2.default.existsSync(fileName)) {
      var data = _fs2.default.readFileSync(fileName).toString();
      var json = JSON.parse(data);
      json.name = projectName;
      json.author = author;
      json.description = description;

      _fs2.default.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
      console.log(_logSymbols2.default.success, _chalk2.default.green('Project initialization finished!'));
    }
  }, function () {
    loading.fail();
  });
};

var init = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(templateName, projectName) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(templateName && !projectName)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', console.log(_logSymbols2.default.error, _chalk2.default.red('ILLEGAL_ARGUMENT')));

          case 2:
            if (!(!templateName && !projectName)) {
              _context.next = 5;
              break;
            }

            _inquirer2.default.prompt([{
              name: 'projectName',
              message: 'Please enter the project name: '
            }, {
              name: 'description',
              message: 'Please enter the project description: '
            }, {
              name: 'author',
              message: 'Please enter the author name: '
            }]).then(function (answer) {
              var projectName = answer.projectName,
                  description = answer.description,
                  author = answer.author;

              if (_fs2.default.existsSync(projectName)) return console.log(_logSymbols2.default.error, _chalk2.default.red('The project already exists'));
              getAndInitProject({ templateName: _Configuation.DEFAULTS.default, projectName: projectName, description: description, author: author });
            });
            return _context.abrupt('return');

          case 5:
            if (!_fs2.default.existsSync(projectName)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('return', console.log(_logSymbols2.default.error, _chalk2.default.red('The project already exists')));

          case 7:
            // 命令行交互
            _inquirer2.default.prompt([{
              name: 'description',
              message: 'Please enter the project description: '
            }, {
              name: 'author',
              message: 'Please enter the author name: '
            }]).then(function (answer) {
              //下载模板 选择模板
              //通过配置文件，获取模板信息
              var description = answer.description,
                  author = answer.author;

              getAndInitProject({ templateName: templateName, projectName: projectName, description: description, author: author });
            });

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function init(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = init;