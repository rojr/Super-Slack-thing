module.exports = electron => {
  const {ipcRenderer} = electron

  console.log('i am ipc')
  ipcRenderer.on('PNIG', () => {
    console.log('RESEEBED A PNIG')
    ipcRenderer.sendToHost('PNOG')
  })
}
