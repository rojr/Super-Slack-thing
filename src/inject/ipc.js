const {ipcRenderer} = global.node.require('electron')

module.exports = () => {
  console.log('i am ipc')
  ipcRenderer.on('PNIG', () => {
    console.log('RESEEBED A PNIG')
    ipcRenderer.sendToHost('PNOG')
  })
}
