module.exports = node => {
  const {ipcRenderer} = node.require('electron')

  console.log('i am ipc')
  ipcRenderer.on('PNIG', () => {
    console.log('RESEEBED A PNIG')
    ipcRenderer.sendToHost('PNOG')
  })
}
