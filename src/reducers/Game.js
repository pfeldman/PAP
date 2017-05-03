import * as types from '../constants/ActionsTypes'

function Game (state = {sound: true}, action) {
  switch (action.type) {
    case types.GAME:
      let game = Object.assign({}, state, {
        game: action.game
      })

      return game
    case types.GAME_DATAILS:
      let gameDetails = Object.assign({}, state, {
        gameDetails: action.payload
      })

      return gameDetails
    case types.WIN:
      let win = Object.assign({}, state, {
        win: (new Date()).getTime()
      })

      return win
    case types.RESET:
      let reset = Object.assign({}, state, {
        game: undefined,
        gameDetails: undefined
      })

      return reset
    case types.SOUND:
      let sound = Object.assign({}, state, {
        sound: action.status
      })

      return sound
    default:
      return state
  }
}

export default Game
