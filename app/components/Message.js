import React from 'react'

class Message extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return 'me' in this.props.message ? 
      <pre style={{ color: '#666' }}>"{this.props.message.me}"</pre>
      : <pre>{this.props.message.him}</pre>
  }
}

Message.propTypes = {
  message: React.PropTypes.object
}

export default Message;
