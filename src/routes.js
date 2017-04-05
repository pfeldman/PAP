import React from 'react'
import { Route } from 'react-router'
import App from './views/App'
import MemoTest from './views/MemoTest'

export default (store) => (
  <Route>
    <Route path='/' component={App} />
    <Route path='/memotest' component={MemoTest} />
  </Route>
)

