import React, { PropTypes } from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import '../../styles/core.scss'

import 'font-awesome/css/font-awesome.css'

import * as control from 'redux/modules/control'

class CoreLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    createSocket: PropTypes.func.isRequired,
    send: PropTypes.func.isRequired,
  }

  componentWillMount() {
    // this.props.createSocket("localhost", 8080, 'commands')
    this.props.createSocket("192.168.2.18", 8080, 'commands')
  }

  componentWillUnmount() {
  }

  render() {
    let {children} = this.props

    return (
      <div className='page-container'>
        <div className='view-container'>
          {children}
        </div>
      </div>
    )
  }
}

export default connect(_.constant({}), {
  createSocket: control.actions.createSocket,
  send: control.actions.send
})(CoreLayout)
