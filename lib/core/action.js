// 处理命令的action
const { promisify } = require('util')
// promisify将 download-git-repo 转为 promise
const download = promisify(require('download-git-repo'))
const open = require('open')
const path = require('path')

const { vueRepo } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')
const { compile, writeToFile, createDirSync } = require('../utils/utils')
const log = require('../utils/log')

const createProjectAction = async (projectName, dest) => {
  log.hint('fhupcli helps you create your peoject, please wait a moment~');
  // 1.git clone (npm库:download-git-repo)
  await download(vueRepo, projectName, { clone: true }) // fhupcli create xxx(生成在当前路径下)
  // 2.执行npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command, ['install'], {cwd: `${projectName}`}) // npm 最终执行 npm.cmd
  // 3.运行npm run serve
  await commandSpawn(command, ['run', 'serve'], {cwd: `${projectName}`})
  // 4.打开浏览器 (npm库:open)
  // open('https://localhost:8080/')
}

const addCpnAction = async (cpnName, dest) => {
  // 1.编译ejs模板 拿到result
  const result = await compile('vue-component.ejs', {name:cpnName,lowerName: cpnName.toLowerCase()})
  // 2.将result写入到 .vue 文件中
  const targetPath = path.resolve(dest, `${cpnName}.vue`)
  writeToFile(targetPath, result)
  // 3.放到对应的文件夹中
  log.hint(dest, '写入文件成功~')
}


const addPageRouteAction = async (pageName, dest) => {
  const data = {name: pageName, lowerName: pageName.toLowerCase()}
  const pageResult = await compile('vue-component.ejs', data)
  const routerResult = await compile('vue-router.ejs', data)
  // 文件不存在就创建
  if(createDirSync(dest)) {
    const pagePath = path.resolve(dest, `${pageName}.vue`)
    const routerPath = path.resolve(dest, `router.js`)
    writeToFile(pagePath, pageResult)
    writeToFile(routerPath, routerResult)
    log.hint(dest, '写入文件成功~')
  }
}

const addStoreAction = async (storeName, dest) => {
  const storeResult = await compile('vue-store.ejs', {})
  const typesResult = await compile('vue-types.ejs', {})
  if(createDirSync(dest)) {
    const storePath = path.resolve(dest, `${storeName}.js`)
    const typesPath = path.resolve(dest, 'types.js')
    writeToFile(storePath, storeResult)
    writeToFile(typesPath, typesResult)
    log.hint(dest, '写入文件成功~')
  }
}

module.exports = {
  createProjectAction,
  addCpnAction,
  addPageRouteAction,
  addStoreAction
}
