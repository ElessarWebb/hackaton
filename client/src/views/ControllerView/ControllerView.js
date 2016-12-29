import React, {PropTypes} from 'react'
import cn from 'classnames'

import classes from './ControllerView.scss'

class ArrowKey extends React.Component {

  static propTypes = {
    icon: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    icon: "",
    className: ""
  }

  render() {
    let {icon, className} = this.props

    return (
      <button type="button" className={cn(classes.ArrowKey, className)}>
        <i className={`fa fa-${icon} fa-2x`} />
      </button>
    )
  }
}

const Arrows = (props) => (
  <div className={classes.Arrows}>
    <ArrowKey className={classes.ArrowLeft} icon="chevron-left" />
    <ArrowKey className={classes.ArrowRight} icon="chevron-right" />
    <ArrowKey className={classes.ArrowUp} icon="chevron-up" />
    <ArrowKey className={classes.ArrowDown} icon="chevron-down" />
  </div>
)
export class Controller extends React.Component {
  static propTypes = {}

  render () {
    return (
      <div className={classes.ControllerView}>
        <Arrows />
      </div>
    )
  }
}

export default Controller
