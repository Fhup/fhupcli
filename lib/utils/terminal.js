/**
 * 执行终端命令的代码
 */
// 开启子进程执行终端命令
const { spawn } = require('child_process')

const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args) // 此进程中有很多的打印信息

    childProcess.stdout.pipe(process.stdout) // 把子进程放到父进程中
    childProcess.stderr.pipe(process.stderr)
    childProcess.on('close', () => {
      resolve()
    })
  })
}

module.exports = {
  commandSpawn
}
