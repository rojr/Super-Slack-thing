const INPUT_CLASS = 'ql-editor'

module.exports = node => {
  const emojify = event => {
    if (window.disableEmojify) return
    const element = event.target
    if (!element.classList.contains(INPUT_CLASS)) return
    if (event.keyCode === 13) {
      const input = element.firstElementChild
      input.textContent = input.textContent.replace(/(\w)/g, ':$1:').replace(/ /g, ':blank:')
    }
  }

  window.addEventListener('keydown', emojify, {capture: true})
}
