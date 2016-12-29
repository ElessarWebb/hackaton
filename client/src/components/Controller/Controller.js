import React, {PropTypes} from 'react'
import cn from 'classnames'

import classes from './Controller.scss'

const Icon = props => <i className={`fa fa-${props.children} fa-2x`} />

Icon.propTypes = {
  children: PropTypes.string.isRequired
}

class Key extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    sendKey: PropTypes.func.isRequired,
    keyCode: PropTypes.string.isRequired
  }

  static defaultProps = {
    node: false,
    className: ""
  }

  constructor(props) {
    super(props)

    this.onClick = () => {
      let {sendKey, keyCode} = this.props
      sendKey(keyCode)
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

const Arrows = ({sendKey}) => (
  <div className={classes.Arrows}>
    <Key className={classes.ArrowLeft} sendKey={sendKey} keyCode="arrow:left"><Icon>chevron-left</Icon></Key>
    <Key className={classes.ArrowRight} sendKey={sendKey} keyCode="arrow:right"><Icon>chevron-right</Icon></Key>
    <Key className={classes.ArrowUp} sendKey={sendKey} keyCode="arrow:up"><Icon>chevron-up</Icon></Key>
    <Key className={classes.ArrowDown} sendKey={sendKey} keyCode="arrow:up"><Icon>chevron-down</Icon></Key>
  </div>
)

Arrows.propTypes = { sendKey: PropTypes.func.isRequired }

const ABKeys = ({sendKey}) => (
  <div className={classes.ABKeys}>
    <Key className={classes.AKey} sendKey={sendKey} keyCode="snes:a">A</Key>
    <Key className={classes.BKey} sendKey={sendKey} keyCode="snes:b">B</Key>
  </div>
)
ABKeys.propTypes = { sendKey: PropTypes.func.isRequired }

export class Controller extends React.Component {
  static propTypes = {
    sendKey: PropTypes.func.isRequired
  }

  render () {
    let {sendKey} = this.props

    return (
      <div className={classes.Controller}>
        <Arrows sendKey={sendKey} />
        <ABKeys sendKey={sendKey} />
      </div>
    )
  }
}

export default Controller
