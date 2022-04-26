const { program } = require('commander')

const { createProjectAction, addCpnAction, addPageRouteAction, addStoreAction } = require('./action')

const createCommands = () => {
  // fhupcli create demo
  program
    .command('create <project> [others...]')
    .description('clone repository into a folder')
    .action(createProjectAction)
  // fhupcli addcpn -d src/components
  program
    .command('addcpn <components_name>')
    .description('add vue components, instance: fhupcli addcpn -d src/components')
    .action((cpnName) => {
      addCpnAction(cpnName, program._optionValues?.dest || 'src/components')
    })

  program
    .command('addpage <page_name>')
    .description('add vue page and router config, 例如: fhupcli addpage [ -d src/pages ]')
    .action((pageName) => {
      addPageRouteAction(pageName, program._optionValues?.dest || `src/pages/${pageName.toLowerCase()}`)
    })

  program
    .command('addstore <store_name>')
    .description('add vue store config, 例如: fhupcli addstore [ -d src/store/modules ]')
    .action((storeName) => {
      addStoreAction(storeName, program._optionValues?.dest || `src/store/modules/${storeName.toLowerCase()}`)
    })

  program.parse(process.argv)
}

module.exports = createCommands
