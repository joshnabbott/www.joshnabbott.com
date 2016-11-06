import React from 'react'
import Console from '../components/Console'
import Cloak from '../components/Cloak'

class Main extends React.Component {
  constructor(props) {
    super(props);

    // Functions
    this.showConsole = this.showConsole.bind(this);
    this.exitConsole = this.exitConsole.bind(this);

    // State
    this.state = { console: false }
  }

  showConsole() {
    this.setState({console: true})
  }

  exitConsole() {
    this.setState({console: false})
  }

  render () {
    if (this.state.console === true) {
      return <Console handlePressEscape={this.exitConsole} />
    } else {
      return <Cloak handleClick={this.showConsole} />
    }
  }
}

export default Main;
