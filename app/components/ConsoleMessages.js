import React from 'react'
import {map} from 'lodash/collection'
import Message from '../components/Message'

class ConsoleMessages extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const messages = map(this.props.messages, (message, index) =>
        <Message key={index} message={message} />);

    return <div>{messages}</div>
  }
}

ConsoleMessages.propTypes = {
  messages: React.PropTypes.array
}

export default ConsoleMessages;
