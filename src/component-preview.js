'use babel'
import React, {Component, PropTypes} from 'react'
import AceEditor from 'react-ace'
require('brace/mode/javascript')
require('brace/theme/github')
class ComponentPreview extends Component {
  constructor (props) {
    super(props)
    this.state = {
      aceValue: 'return {}',
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
              editorProps={{$blockScrolling: true}}
            />
          <pre>
          {'})()'}
          </pre>
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
