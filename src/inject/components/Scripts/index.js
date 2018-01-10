const STORE_KEY_SCRIPTS = 'scripts'
const Panel = require('./Panel')
const {React} = window
const run = require('../../run-script')
const {filter} = require('lodash/fp')

const generateId = () => Math.random().toString(36).slice(2)

module.exports = class Scripts extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      shown: false,
      editing: null,
      scripts: {},
      activeScripts: {}
    }

    const scripts = window.localStorage.getItem(STORE_KEY_SCRIPTS)

    this.state.scripts = scripts ? JSON.parse(scripts) : {
      snoot: {
        id: 'snoot',
        label: 'snoot script',
        description: 'my new script',
        setup: `console.log('bottle up!')`,
        teardown: `console.log('explode!')`
      }
    }

    window._snoots = {
      'snoot': {}
    }

    this.toggle = this.toggle.bind(this)
    this.hide = this.hide.bind(this)
    this.keyboardToggle = this.keyboardToggle.bind(this)
    this.edit = this.edit.bind(this)
    this.save = this.save.bind(this)
    this.activate = this.activate.bind(this)
    this.deactivate = this.deactivate.bind(this)
    this.onChange = this.onChange.bind(this)
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
  }

  componentDidMount () {
    window.addEventListener('keydown', this.keyboardToggle)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.keyboardToggle)
  }

  keyboardToggle ({key, metaKey}) {
    if (!metaKey || key !== '\\') return
    this.toggle()
  }

  toggle () {
    this.setState(state => ({
      shown: !state.shown
    }))
  }

  hide () {
    this.setState({shown: false})
  }

  edit (id) {
    this.setState({
      editing: id
    })
  }

  save (callback) {
    this.setState(state => {
      window.localStorage.setItem(STORE_KEY_SCRIPTS, JSON.stringify(state.scripts))
      return {editing: null}
    }, callback)
  }

  add () {
    const id = generateId()
    this.setState(state => {
      return {
        scripts: {
          ...state.scripts,
          [id]: {id}
        }
      }
    }, () => {
      this.save()
      this.edit(id)
    })
  }

  remove (id) {
    this.setState(state => {
      return {
        scripts: filter(script => script.id !== id, state.scripts)
      }
    }, () => this.save())
  }

  activate (id) {
    const script = this.state.scripts[id]
    if (!script || !script.teardown || !script.teardown.trim()) {
      return window.alert('i simply will not activate without a teardown')
    }
    this.setState(state => ({
      activeScripts: {
        ...state.activeScripts,
        [id]: true
      }
    }))
    run(script.setup, script.id)
  }

  deactivate (id) {
    this.setState(state => ({
      activeScripts: {
        ...state.activeScripts,
        [id]: false
      }
    }))
    const script = this.state.scripts[id]
    run(script.teardown, script.id)
  }

  onChange (id, change) {
    this.setState(state => {
      const script = state.scripts[id]
      return {
        scripts: {
          ...state.scripts,
          [script.id]: {
            ...script,
            ...change
          }
        }
      }
    })
  }

  render () {
    const {shown, editing, scripts, activeScripts} = this.state
    return (
      <Panel
        scripts={scripts}
        shown={shown}
        hide={this.hide}
        editing={editing}
        save={this.save}
        edit={this.edit}
        activate={this.activate}
        deactivate={this.deactivate}
        activeScripts={activeScripts}
        onChange={this.onChange}
        add={this.add}
        remove={this.remove}
      />
    )
  }
}
