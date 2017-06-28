const electron = global.require('electron')

delete global.require
delete global.module
delete global.__filename
delete global.__dirname
delete global.process

const modules = [
  require('./ipc'),
  require('./ui')
]

document.addEventListener('readystatechange', function stateChange () {
  if (document.readyState === 'complete') {
    modules.forEach(module => typeof module === 'function' && module(electron))
    document.removeEventListener('readystatechange', stateChange)
  }
})
