'use babel'
import React, {Component, PropTypes} from 'react'
import AceEditor from 'react-ace'
require('brace/mode/javascript')
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
        <div style={{float: 'left', display: 'inline-block'}}>
          <pre>
          {'(function() {'}
          </pre>
            <AceEditor
              value={this.state.aceValue}
              mode='javascript'
              theme='github'
              onChange={this.onChange.bind(this)}
              name='UNIQUE_ID_OF_DIV'
            />
          <pre>
          {'})()'}
          </pre>
          <span style={{color: 'red'}}>{this.state.error}</span>
        </div>
        <div><Component {...this.state.testProps} /></div>
      </div>

    )
  }
}

ComponentPreview.displayName = 'ComponentPreview'
ComponentPreview.propTypes = {
  component: PropTypes.func
}

export default ComponentPreview
