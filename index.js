#!/usr/bin/env node

// 通过shebang(#!),后面配置的环境,来执行文件
// console.log('fhupcli');

// 自定义终端命令
// 1.
// "bin": {
//   "fhupcli": "index.js"
// },
// 2.npm link
// 3.命令行 将命令fhupcli添加到终端中

// commander库的使用
const { program } = require('commander')

const helpOptions = require('./lib/core/help')
const createCommands = require('./lib/core/create')

// 查看版本号
program.version(require('./package.json').version)

// 帮助和可选信息(fhupcli --help)
helpOptions()

// 创建其他指令
createCommands()


