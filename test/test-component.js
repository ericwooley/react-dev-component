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
