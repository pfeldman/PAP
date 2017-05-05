import * as types from '../constants/ActionsTypes'

function SessionService (state = {}, action) {
  switch (action.type) {
    case types.LOGIN:
      let loggedIn = Object.assign({}, state, {
        loggedIn: true,
        name: action.name,
        level: action.level,
        username: action.username,
        loggedInError: false
      })

      return loggedIn
    case types.LOGOUT:
      let logout = Object.assign({}, state, {
        loggedIn: false,
        name: undefined,
        lavel: undefined,
        username: undefined,
        loggedInError: false
      })

      return logout
    case types.LOGIN_ERROR:
      let notLoggedIn = Object.assign({}, state, {
        loggedIn: false,
        name: null,
        level: null,
        username: null,
        loggedInError: true
      })

      return notLoggedIn
    case types.GET_AREAS:
      let stringAreas = []
      action.areas.map(area => {
        stringAreas.push(area.area)
      })
      let areas = Object.assign({}, state, {
        areas: stringAreas,
        timestamp: (new Date()).getTime()
      })

      return areas
    case types.LEVEL_UPDATED:
      let levelUpdated = Object.assign({}, state, {
        level: parseInt(action.level, 10)
      })

      return levelUpdated
    case types.SELECTING_GAME:
      let selectingGame = Object.assign({}, state, {
        selectingGame: true
      })

      return selectingGame
    default:
      if (localStorage.getItem('loggedIn')) {
        state = Object.assign({}, state, {
          loggedIn: !!localStorage.getItem('loggedIn'),
          name: localStorage.getItem('name'),
          level: parseInt(localStorage.getItem('level'), 10),
          username: localStorage.getItem('username'),
          loggedInError: false
        })
      }
      return state
  }
}

export default SessionService
