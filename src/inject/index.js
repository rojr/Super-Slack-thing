const node = {
  require: global.require,
  process: global.process
}

delete global.require
delete global.module
delete global.__filename
delete global.__dirname
delete global.process

document.addEventListener('readystatechange', function stateChange () {
  if (document.readyState === 'complete') {
    document.removeEventListener('readystatechange', stateChange)
    require('./ipc')(node)
  }
})
