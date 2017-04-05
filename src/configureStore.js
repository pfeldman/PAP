import { applyMiddleware, createStore, compose } from 'redux'
import { syncHistory } from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

export default function configureStore ({ initialState = {}, history }) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(thunk, syncHistory(history)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))

  if (module.hot) {
    module.hot.accept('./reducers/rootReducer', () => {
      const nextRootReducer = require('./reducers/rootReducer').default
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
