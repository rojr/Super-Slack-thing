const webview = document.getElementById('slack')

webview.addEventListener('dom-ready', () => {
  webview.openDevTools()
})
