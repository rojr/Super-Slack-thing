module.exports = webview => {
  webview.getWebContents().on('new-window', (event, url) => {
    event.preventDefault()
    const {shell} = require('electron')
    shell.openExternal(url)
  })
}
