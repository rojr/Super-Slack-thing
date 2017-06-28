// TODO consider using eval, so the result can be .then'd upon

module.exports = function runScript(content, id) {
  const script = document.createElement('script')
  script.textContent = `
    (async function () {
      ${content}
    }).call(window._snoots['${id}'])
  `
  document.body.appendChild(script)
  document.body.removeChild(script)
}
