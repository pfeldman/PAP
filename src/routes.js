import React from 'react'
import { Route } from 'react-router'
import App from './views/App'
import Admin from './views/Admin'

export default (store) => (
  <Route>
    <Route path='/' component={App} />
    <Route path='/admin' component={Admin} />
  </Route>
)
