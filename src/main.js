import React from 'react'
import ReactDOM from 'react-dom'
import { useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'
import Routes from './routes'
import Root from './views/Root'
import configureStore from 'configureStore'

const history = useRouterHistory(createHashHistory)({ queryKey: false })

const initialState = window.__INITIAL_STATE__
const store = configureStore({ initialState, history })

const routes = Routes(store)
// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
)
