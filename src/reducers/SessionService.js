import * as types from '../constants/ActionsTypes'

function SessionService (state = {}, action) {
  switch (action.type) {
    case types.LOGIN:
      let loggedIn = Object.assign({}, state, {
        loggedIn: true,
        name: action.name,
        level: action.level,
        loggedInError: false
      })

      return loggedIn
    case types.LOGIN_ERROR:
      let notLoggedIn = Object.assign({}, state, {
        loggedIn: false,
        name: null,
        level: null,
        loggedInError: true
      })

      return notLoggedIn
    default:
      if (localStorage.getItem('loggedIn')) {
        state = Object.assign({}, state, {
          loggedIn: !!localStorage.getItem('loggedIn'),
          name: localStorage.getItem('name'),
          level: parseInt(localStorage.getItem('level'), 10),
          loggedInError: false
        })
      }
      return state
  }
}

export default SessionService
