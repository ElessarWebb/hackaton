import React, {PropTypes} from 'react'

import Controller from 'components/Controller'

export class ControllerView extends React.Component {

  static propTypes = {
    host: PropTypes.string,
    port: PropTypes.number,
  }

  static defaultProps = {
    host: '192.168.2.18',
    port: 8080
  }

  constructor(props) {
    super(props)

    this.socket = null
    this.sendKey = this.sendKey.bind(this)
  }

  componentWillMount() {
    let {host, port} = this.props
    this.socket = new WebSocket(`ws://${host}:${port}/commands`)
    this.socket.onopen = () => console.log("Connected to server")
    this.socket.onmessage = (msg) => console.log("Received: " + msg)
    this.socket.onclose = () => console.log("Connected to server")
  }

  componentWillUnmount() {
  }

  sendKey(keyCode) {
    console.log("Sending: " + keyCode)
    this.socket.send(keyCode)
  }

  render () {
    return (
      <Controller sendKey={this.sendKey} />
    )
  }
}

export default ControllerView
