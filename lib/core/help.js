const { program } = require('commander')
const helpOptions = () => {
  // 添加自己的options
  // fhupcli --help
  // fhupcli -d /src/components
  program
    .option('-h, --fhupcli', 'a fhupcli cli')
    .option('-d, --dest <dest>', 'a destination folder, 例如: -d /src/components')
    .option('-f, --framework <framework>', 'your framework')
  program.on('--help', () => {
    console.log();
    console.log('other:');
    console.log(' other options~');
  })
  // 解析命令行命令
  program.parse(process.argv)
  // if(Object.keys(program._optionValues).length > 0) {
  //   console.log('帮助和可选信息:', program._optionValues);
  // } 
}

module.exports = helpOptions
