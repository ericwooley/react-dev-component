import React, {Component, PropTypes} from 'react'
class TestComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <h1>{this.props.body}</h1>
      </div>)
  }
}
TestComponent.displayName = 'TestComponent'
TestComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string
}
TestComponent.defaultProps = {
  title: 'React hot loader, for a single component',
  body: 'Changing your component live updates here as well.'
}
export default TestComponent
