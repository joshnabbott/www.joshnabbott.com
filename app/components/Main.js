import React from 'react'
import Console from '../components/Console'
import Cloak from '../components/Cloak'

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.state = { console: false }
  }

  handleClick() {
    this.setState({console: true})
  }

  render () {
    if (this.state.console === true) {
      return <Console />
    } else {
      return <Cloak handleClick={this.handleClick} />
    }
  }
}

export default Main;
