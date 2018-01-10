module.exports = webview => {
  if (process.platform !== 'darwin') return
  const titleBar = document.createElement('div')
  const height = '36px'
  document.body.insertBefore(titleBar, document.body.firstElementChild)
  Object.assign(titleBar.style, {
    background: '#424446',
    height,
    webkitAppRegion: 'drag',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0
  })
  webview.style.top = height
}
