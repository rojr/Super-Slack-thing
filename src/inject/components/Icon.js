const Icon = ({name, style}) =>
  <ts-icon
    style={style}
    class={`ts_icon_${name}`}
    aria-hidden={true}
  />

module.exports = Icon
