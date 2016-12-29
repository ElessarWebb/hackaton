/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { increment, doubleAsync } from '../../redux/modules/counter'
import classes from './HomeView.scss'

export class HomeView extends React.Component {

  static propTypes = {};

  render () {
    return (
      <div className='container text-center'>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
})
export default connect(mapStateToProps, {
  increment: () => increment(1),
  doubleAsync
})(HomeView)
