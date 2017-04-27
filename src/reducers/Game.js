import * as types from '../constants/ActionsTypes'

function Game (state = {}, action) {
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
    default:
      return state
  }
}

export default Game
