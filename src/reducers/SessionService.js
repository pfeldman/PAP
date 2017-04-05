import * as types from '../constants/ActionsTypes'

function SessionService (state = {}, action) {
  switch (action.type) {
    case types.LOGIN:
      let loggedIn = Object.assign({}, state, {
        loggedIn: action.loggedIn
      })

      return loggedIn
    default:
      if (localStorage.getItem('loggedIn')) {
        state = Object.assign({}, state, {
          loggedIn: localStorage.getItem('loggedIn')
        })
      }
      return state
  }
}

export default SessionService
