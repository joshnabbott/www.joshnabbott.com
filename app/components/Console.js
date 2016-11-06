import React from 'react';
import update from 'immutability-helper';
import ConsoleMessages from '../components/ConsoleMessages';
import $ from '../vendor/jquery';
import {sanitize} from '../lib/TextHelper';
import LocalStorage from '../lib/LocalStorage';

class Console extends React.Component {
  constructor(props) {
    super(props);

    // properties
    this.botID = '91337c8f7e3434ee';
    this.customerId = LocalStorage.get('customer_id'),

    // Functions
    this.handleKeyUp = this.handleKeyUp.bind(this);

    // State
    this.state = { messages: [] }
  }

  componentDidMount() {
    this.textInput.focus();
    document.body.addEventListener('keyup', (e) => { this.handlePressEsc(e) })
  }

  componentDidUpdate() {
    this.consoleViewer.scrollTop = this.consoleViewer.scrollHeight;
  }

  componentWillUnmount() {
    document.body.removeEventListener('keyup', this.handlePressEsc)
  }

  handleKeyUp(e) {
    if (e.key === 'Enter') {
      this.setState({
        messages: update(this.state.messages, { $push: [{ me: e.target.value }] })
      });
      this.submitQuery(e.target.value);
      e.target.value = '';
    }
  }

  handlePressEsc(e) {
    if (e.key === 'Escape') this.props.handlePressEscape();
  }

  submitQuery(query) {
    $.post('http://pandorabots.herokuapp.com', {
      custid: this.customerId,
      botid: this.botID,
      input: query
    }, (data) => {
      const parsed = JSON.parse(data);

      if (typeof(this.customerId) === 'undefined') LocalStorage.set('customer_id', parsed.customer_id);

      this.setState({
        messages: update(this.state.messages, { $push: [{ him: sanitize(parsed.response) }] })
      });
    });
  }

  render() {
    return (
      <div>
        <div ref={(e) => this.consoleViewer = e} style={{ height: '50%', overflowY: 'auto' }}><ConsoleMessages messages={this.state.messages} /></div>

        <input ref={(e) => this.textInput = e } type="text" autoComplete="off" placeholder="go on, say something..."
          style={{
            backgroundColor: 'transparent',
            borderWidth: 0,
            color: 'rgb(255, 255, 255)',
            display: 'table-cell',
            fontFamily: 'Courier',
            fontSize: 12,
            height: 14,
            paddingLeft: 10,
            position: 'relative',
            verticalAlign: 'middle',
            width: '100%'
          }} onKeyUp={this.handleKeyUp} />
      </div>
    )
  }
}

export default Console;
