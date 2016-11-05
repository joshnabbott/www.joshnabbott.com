import React from 'react'
import update from 'immutability-helper';
import ConsoleMessages from '../components/ConsoleMessages'
import $ from '../vendor/jquery';

class Console extends React.Component {
  constructor(props) {
    super(props);

    // properties
    this.botID = '91337c8f7e3434ee';

    // Functions
    this.handleKeyUp = this.handleKeyUp.bind(this);

    // State
    this.state = {
      custID: null,
      messages: []
    }
  }

  componentDidMount() {
    this.textInput.focus();
  }

  componentDidUpdate() {
    this.consoleViewer.scrollTop = this.consoleViewer.scrollHeight;
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

  // A lot of responses are coming back with multiple spaces
  // this replaces multiple spaces for just one
  sanitizeResponse(dirtyString) {
    return dirtyString.replace(/\s{2,}/g, ' '); 
  }

  submitQuery(query) {
    $.post('http://pandorabots.herokuapp.com', {
      custid: this.state.custID,
      botid: this.botID,
      input: query
    }, (data) => {
      const parsed = JSON.parse(data);
      this.setState({
        custID: parsed.customer_id,
        messages: update(this.state.messages, { $push: [{ him: this.sanitizeResponse(parsed.response) }] })
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
