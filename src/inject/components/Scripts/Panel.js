const Icon = require('../Icon')

const Heading = ({title, hide}) =>
  // TODO add close func to button
  <div className='heading' tabindex='-1'>
    <div className='heading_row'>
      <h2 className='heading_text overflow_ellipsis'>{title}</h2>
      <button
        className='btn_basic close_flexpane'
        aria-label='Close Right Sidebar'
        title='Close Right Sidebar'
        type='button'
        onClick={hide}
      >
        <Icon name='times'/>
      </button>
    </div>
  </div>

const Button = ({icon, onClick, style, iconStyle, children}) =>
  <button
    style={style}
    type='button'
    className='btn btn_outline'
    onClick={onClick}
  >
    {icon && <Icon name={icon} style={iconStyle}/>}
    {children}
  </button>

const flexEqualSpace = {display: 'flex', alignItems: 'center', justifyContent: 'space-between'}

const Switch = ({enabled, activate, deactivate, marginLeft}) =>
  <Button
    style={{marginLeft: 10, padding: 0}}
    iconStyle={{
      color: enabled ? '#ff2a50' : '#eeeeee',
      padding: 9,
      display: 'block',
      fontSize: 22,
      marginLeft: marginLeft ? 5 : 0
    }}
    onClick={enabled ? deactivate : activate}
    icon={enabled ? 'heart_large_filled' : 'heart_o'}
  />

const ScriptsPanelItem = ({
  label,
  description,
  enabled,
  activate,
  deactivate,
  edit
}) =>
  <div>
    <div style={flexEqualSpace}>
      <strong>
        {label}
      </strong>
      <div>
        <Button onClick={edit}>
          edit
        </Button>
        <Switch
          enabled={enabled}
          activate={activate}
          deactivate={deactivate}
          marginLeft={true}
        />
      </div>
    </div>
    <div>
      {description}
    </div>
  </div>

const ScriptEditor = ({
  script: {teardown, setup, id},
  save,
  activate,
  deactivate,
  enabled,
  onChange
}) =>
  <div>
    {/* TODO reduce duplication */}
    {/* TODO run teardown and disable when edit begins */}
    {/* TODO allow changing title and description */}
    <label style={{margin: '2em 0'}}>
      <strong>Setup</strong>
      <textarea
        style={{width: '100%'}}
        value={setup}
        onChange={({target: {value: setup}}) =>
          onChange(id, {setup})
        }
      />
    </label>
    <label style={{margin: '2em 0'}}>
      <strong>Teardown</strong>
      <textarea
        style={{width: '100%'}}
        value={teardown}
        onChange={({target: {value: teardown}}) =>
          onChange(id, {teardown})
        }
      />
    </label>
    <Button onClick={save}>
      save
    </Button>
    <Switch
      enabled={enabled}
      activate={() => activate(id)}
      deactivate={() => deactivate(id)}
      marginLeft={true}
    />
  </div>

module.exports = class ScriptsPanel extends React.PureComponent {
  componentDidMount () {
    if (this.props.shown) {
      document.getElementById('client-ui').classList.add('flex_pane_showing')
    }
  }

  componentDidUpdate () {
    if (this.props.shown) {
      document.getElementById('client-ui').classList.add('flex_pane_showing')
    } else {
      document.getElementById('client-ui').classList.remove('flex_pane_showing')
    }
  }

  componentWillUnmount () {
    document.getElementById('client-ui').classList.add('flex_pane_showing')
  }

  render () {
    const {shown, hide, edit, save, scripts, editing, activate, deactivate, activeScripts, onChange} = this.props
    const script = scripts[editing]
    // TODO "➕ add" button
    return (
      <div className={`panel ${shown ? 'active' : ''}`} id='scripts_tab'>
        <Heading title={editing && script ? `Editing ${script.label}` : 'Snoot snoot!'} close={hide}/>
        <div id='scripts_scroller' className='flex_content_scroller'>
          <div style={{padding: '1em'}}>
            {editing ||
              Object.values(scripts).map(script =>
                <ScriptsPanelItem
                  key={script.id}
                  label={script.label}
                  description={script.description}
                  enabled={activeScripts[script.id]}
                  edit={() => edit(script.id)}
                  activate={() => activate(script.id)}
                  deactivate={() => deactivate(script.id)}
                />)
            }
            {editing &&
              <ScriptEditor
                script={script}
                save={save}
                activate={activate}
                deactivate={deactivate}
                enabled={activeScripts[script.id]}
                onChange={onChange}
              />
            }
          </div>
        </div>
      </div>
    )
  }
}
