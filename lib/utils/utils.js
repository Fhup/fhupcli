const path = require('path')
const fs = require('fs')

const ejs = require('ejs')
const log = require('../utils/log')

// 将ejs.renderFile转为promise风格
// const { promisify } = require('util')
// const renderFilePromise = promisify(ejs.renderFile)

// 使用ejs库 先添加有对应的ejs模板 <% %>
// 编译ejs模板 返回result
const compile = (templateName, data) => {
  const templatePath = path.resolve(__dirname, `../templates/${templateName}`)
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, {data}, {}, (err, result) => {
      if(err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

// 路径不存在时,创建路径
// 可以对路径进行切割-并创建
const createDirSync = (pathName) => {
  if(fs.existsSync(pathName)) {
    return true
  }else {
    if(createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName)
      return true
    }
  }
}

// 将result的模板字符串写入到文件中
const writeToFile = (path, resultStr) => {
  return fs.promises.writeFile(path, resultStr)
}

// 3.放到对应的文件夹中

module.exports = {
  compile,
  writeToFile,
  createDirSync
}