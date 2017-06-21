module.exports = webview => {
  webview.addEventListener('ipc-message', event => {
    console.log(event.channel)
  })
  webview.send('PNIG')
}
