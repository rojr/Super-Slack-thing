module.exports = () => {
const Scripts = require('./components/Scripts')
const scripts = document.createElement('scripts')
ReactDOM.render(<Scripts/>, scripts)

const panels = document.querySelector('#flex_contents')
panels && panels.append(scripts)
}
