import React from 'react'
import { Route, IndexRoute } from 'react-router'

import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView/HomeView'
import ControllerView from 'views/ControllerView/ControllerView'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path="/controller" component={ControllerView} />
  </Route>
)
