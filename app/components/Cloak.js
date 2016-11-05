import React from 'react'

class Cloak extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.body.addEventListener('click', this.props.handleClick)
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.props.handleClick)
  }

  render() {
    return (
      <div style={{ display: 'flex', height: '100%', width: '100%' }}>
        <p style={{ margin: 'auto' }}>My name is Josh and I c0de cool stuff for the internet</p>
      </div>
    )
  }
}

Cloak.propTypes = {
  handleClick: React.PropTypes.func
}

export default Cloak;
