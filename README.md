react-dev-component
=====================

The minimal dev environment to enable live-editing React components with text input for to define
your props

```bash
npm install -g ericwooley/react-dev-component
react-dev-component --component src/my-react-component.js
```

Your react component should export the class as default:

```js
import React, {Component, PropTypes} from 'react'
class TestComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (<h3>Test Component {this.props.value}</h3>)
  }
}
TestComponent.displayName = 'TestComponent'
TestComponent.propTypes = {
  value: PropTypes.string
}
export default TestComponent

```
