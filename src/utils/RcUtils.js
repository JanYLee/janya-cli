import fs from 'fs';
import chalk from 'chalk';
import { promisify } from 'util';
import { decode, encode } from 'ini';

import { RC, DEFAULTS } from './Configuation.js';

const exits = promisify(fs.exists);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

export const getAll = async () => {
  const exit = await exits(RC);
  if (!exit) return DEFAULTS;
  let opts = await readFile(RC, 'utf8');
  opts = decode(opts);
  return opts;
}

export const get = async (key) => {
  const exit = await exits(RC);
  if (!exit) return '';
  let opts= await readFile(RC, 'utf8');
  opts = decode(opts);
  return opts[key];
}

export const set = async (key, value) => {
  if (!key) return console.log(chalk.red(chalk.bold('Error:')), chalk.red('key is required'));
  if (!value) return console.log(chalk.red(chalk.bold('Error:')), chalk.red('value is required'));
    
  const exit = await exits(RC);
  let opts;
  if (exit) {
    opts = await readFile(RC, 'utf8');
    opts = decode(opts);
    opts = Object.assign(opts, { [key]: value });
  } else {
    opts = Object.assign(DEFAULTS, { [key]: value });
  }
  await writeFile(RC, encode(opts), 'utf8');
}

export const remove = async (key) => {
  const exit = await exits(RC);
  if (exit) {
    let opts;
    opts = await readFile(RC, 'utf8');
    opts = decode(opts);
    delete opts[key];
    await writeFile(RC, encode(opts), 'utf8');
  }
}

