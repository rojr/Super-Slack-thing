module.exports = webview => {
  require('electron-context-menu')({
    window: webview,
    showInspectElement: true
  })
}
