import React, {Component, PropTypes} from 'react'
class TestComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div>
        <h3>Test Component</h3>
        <p>{this.props.value}</p>
      </div>)
  }
}
TestComponent.displayName = 'TestComponent'
TestComponent.propTypes = {
  value: PropTypes.string
}
TestComponent.defaultProps = {
  value: 'test'
}
export default TestComponent
