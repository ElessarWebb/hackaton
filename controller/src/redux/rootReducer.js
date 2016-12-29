import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import control from './modules/control'

export default combineReducers({
  control,
  router
})
