import * as types from '../constants/ActionsTypes'

function Admin (state = {}, action) {
  switch (action.type) {
    case types.ADMIN_LEVEL:
      let adminLevel = Object.assign({}, state, {
        level: action.level
      })

      return adminLevel
    case types.ADMIN_AREA:
      let adminArea = Object.assign({}, state, {
        area: action.area
      })

      return adminArea
    case types.ADMIN_GAME:
      let adminGame = Object.assign({}, state, {
        game: action.game
      })

      return adminGame
    default:
      return state
  }
}

export default Admin
