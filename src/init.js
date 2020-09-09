import fs from 'fs';
import ora from 'ora';
import chalk from 'chalk';
import inquirer from 'inquirer';
import symbol from 'log-symbols';

import * as api from './utils/Api';
import { DEFAULTS } from './utils/Configuation';

const getAndInitProject = ({templateName, projectName, description, author}) => {
  let loading = ora('downloading template ...');
  loading.start();
  api.downloadLocal(templateName, projectName).then(() => {
    loading.succeed();
    const fileName = `${projectName}/package.json`;
    if(fs.existsSync(fileName)) {
      const data = fs.readFileSync(fileName).toString();
      let json = JSON.parse(data);
      json.name = projectName;
      json.author = author;
      json.description = description;

      fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
      console.log(symbol.success, chalk.green('Project initialization finished!'));
    }
  }, () => {
    loading.fail();
  })
}

const init = async (templateName, projectName) => {
  if(templateName && !projectName) {
    return console.log(symbol.error, chalk.red('ILLEGAL_ARGUMENT'));
  }

  // 不输入模版名称的默认流程
  if(!templateName && !projectName) {
    inquirer.prompt([
      {
        name: 'projectName',
        message: 'Please enter the project name: ',
        default: 'myApp'
      },
      {
        name: 'description',
        message: 'Please enter the project description: '
      },
      {
        name: 'author',
        message: 'Please enter the author name: '
      }
    ]).then(answer => {
      const { projectName, description, author } = answer;
      if(fs.existsSync(projectName)) return console.log(symbol.error, chalk.red('The project already exists'));
      getAndInitProject({templateName: DEFAULTS.default, projectName, description, author});
    })
    return;
  }

  // 输入了具体的模版地址和项目名称的流程

  if(fs.existsSync(projectName)) {
    return console.log(symbol.error, chalk.red('The project already exists'));
  }
  // 命令行交互
  inquirer.prompt([
    {
      name: 'description',
      message: 'Please enter the project description: '
    },
    {
      name: 'author',
      message: 'Please enter the author name: '
    }
  ]).then(answer => {
    //下载模板 选择模板
    //通过配置文件，获取模板信息
    const { description, author } = answer;
    getAndInitProject({templateName, projectName, description, author});
  })
}

module.exports = init;
