module.exports = webview => {
  require('./titleBar')(webview)
  webview.addEventListener('dom-ready', () => {
    require('./ipc')(webview)
    require('./contextMenu')(webview)
  })
}
