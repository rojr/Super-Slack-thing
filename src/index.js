const domReadyModules = [
  require('./ipc'),
  require('./contextMenu'),
  require('./newWindow')
]

module.exports = webview => {
  require('./titleBar')(webview)
  webview.addEventListener('dom-ready', () => {
    domReadyModules.forEach(module =>
      typeof module === 'function' && module(webview)
    )
  })
}
