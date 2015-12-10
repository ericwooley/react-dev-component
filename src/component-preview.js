'use babel'
import React, {Component, PropTypes} from 'react'
import AceEditor from 'react-ace'
// It appears Javascript is broken
require('brace/mode/java')
require('brace/theme/github')

function getDefaultVal (obj = {value: 'consider adding some default props'}) {
  return `
return ${JSON.stringify(obj, null, 2)}
`
}

class ComponentPreview extends Component {
  constructor (props) {
    super(props)
    const defaultVal = getDefaultVal(props.component.defaultProps)
    this.state = {
      aceValue: defaultVal,
      testProps: {}
    }
  }
  onChange (aceValue) {
    const nextState = {...this.state, aceValue}
    try {
      /* eslint-disable */
      nextState.testProps = eval(`
        (function() {
          ${aceValue}
        })()
      `)
      /* eslint-enable */
      nextState.error = null
    } catch (e) {
      nextState.error = `Could not set new props
        ${e}
      `
    }
    this.setState(nextState)
  }
  render () {
    var Component = this.props.component
    return (
      <div>
        <div style={{float: 'left', display: 'inline-block', margin: '10px', border: '1px solid black'}}>
          <pre>
          {'(function() {'}
          </pre>
            <AceEditor
              value={this.state.aceValue}
              mode='java'
              theme='github'
              onChange={this.onChange.bind(this)}
              name='UNIQUE_ID_OF_DIV'
              editorProps={{$blockScrolling: true}}
            />
          <pre>
          {'})()'}
          </pre>
          <span style={{color: 'red'}}>{this.state.error}</span>
        </div>
        <div style={{display: 'inline-block', margin: '10px', border: '1px solid black', padding: '20px'}}>
          <Component {...this.state.testProps} />
        </div>
      </div>

    )
  }
}

ComponentPreview.displayName = 'ComponentPreview'
ComponentPreview.propTypes = {
  component: PropTypes.func
}

export default ComponentPreview
