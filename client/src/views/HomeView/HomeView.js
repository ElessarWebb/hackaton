import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as control from 'redux/modules/control'

import * as protocol from 'protocol'

export class HomeView extends React.Component {

  static propTypes = {
    send: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props)

    this.state = {
      username: "",
      submitted: false
    }

    this.onChange = (e) => {
      this.setState({
        username: e.target.value,
      })
    }

    this.go = () => {
      this.setState({
        submitted: true
      })

      this.props.send(protocol.identify(this.state.username))
    }

    this.handleMessage = (msg) => {
      console.log("Yeah, handling")
    }
  }

  componentWillMount() {
    this.props.subscribe(this.handleMessage)
  }

  componentWillUnmount() {
    this.props.unsubscribe(this.handleMessage)
  }

  render () {
    let {value, submitted} = this.state

    return (
      <div className='container text-center'>
        <input type="text" onChange={this.onChange} placeholder="username" value={value} />
        <button onClick={this.go} type="button" disabled={submitted}>Go!</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps, {
  send: control.actions.send,
  subscribe: control.actions.subscribe,
  unsubscribe: control.actions.unsubscribe,
})(HomeView)
