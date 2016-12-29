import React, {PropTypes} from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'

import Controller from 'components/Controller'

import * as control from 'redux/modules/control'

export class ControllerView extends React.Component {

  static propTypes = {
    send: PropTypes.func.isRequired
  }

  render () {
    let {send} = this.props
    return (
      <Controller send={send} />
    )
  }
}

export default connect(_.constant({}), {
  send: control.actions.send
})(ControllerView)
