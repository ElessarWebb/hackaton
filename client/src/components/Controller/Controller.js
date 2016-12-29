import React, {PropTypes} from 'react'
import cn from 'classnames'
import * as protocol from 'protocol'

import classes from './Controller.scss'

const Icon = props => <i className={`fa fa-${props.children} fa-2x`} />

Icon.propTypes = {
  children: PropTypes.string.isRequired
}

class Key extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    send: PropTypes.func.isRequired,
    keyCode: PropTypes.string.isRequired
  }

  static defaultProps = {
    node: false,
    className: ""
  }

  constructor(props) {
    super(props)

    this.onClick = () => {
      let {send, keyCode} = this.props
      send(protocol.keypress(keyCode))
    }
  }

  render() {
    let {children, className} = this.props

    return (
      <button onClick={this.onClick} type="button" className={cn(classes.Key, className)}>
        <div className={classes.Shade}></div>
        {children}
      </button>
    )
  }
}

const Arrows = ({send}) => (
  <div className={classes.Arrows}>
    <Key className={classes.ArrowLeft} send={send} keyCode="arrow:left"><Icon>chevron-left</Icon></Key>
    <Key className={classes.ArrowRight} send={send} keyCode="arrow:right"><Icon>chevron-right</Icon></Key>
    <Key className={classes.ArrowUp} send={send} keyCode="arrow:up"><Icon>chevron-up</Icon></Key>
    <Key className={classes.ArrowDown} send={send} keyCode="arrow:up"><Icon>chevron-down</Icon></Key>
  </div>
)

Arrows.propTypes = { send: PropTypes.func.isRequired }

const ABKeys = ({send}) => (
  <div className={classes.ABKeys}>
    <Key className={classes.AKey} send={send} keyCode="snes:a">A</Key>
    <Key className={classes.BKey} send={send} keyCode="snes:b">B</Key>
  </div>
)
ABKeys.propTypes = { send: PropTypes.func.isRequired }

export class Controller extends React.Component {
  static propTypes = {
    send: PropTypes.func.isRequired
  }

  render () {
    let {send} = this.props

    return (
      <div className={classes.Controller}>
        <Arrows send={send} />
        <ABKeys send={send} />
      </div>
    )
  }
}

export default Controller
