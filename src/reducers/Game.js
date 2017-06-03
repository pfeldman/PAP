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
        gameDetails: action.payload,
        updated: (new Date()).getTime()
      })

      return gameDetails
    case types.GAME_FAIL:
      let fail = Object.assign({}, state, {
        gameDetails: [],
        updated: (new Date()).getTime()
      })

      return fail
    case types.BACKGROUND_CHANGED:
      let backgroundChanged = Object.assign({}, state, {
        backgroundChanged: (new Date()).getTime()
      })

      return backgroundChanged
    case types.SECUNDARY_CHANGED:
      let secondaryChanged = Object.assign({}, state, {
        secondaryChanged: (new Date()).getTime()
      })

      return secondaryChanged
    case types.DESCRIPTION_CHANGED:
      let descriptionChanged = Object.assign({}, state, {
        descriptionChanged: (new Date()).getTime()
      })

      return descriptionChanged
    case types.TEXT_CHANGED:
      let textChanged = Object.assign({}, state, {
        textChanged: (new Date()).getTime()
      })

      return textChanged
    case types.CARD_ADDED:
      let cardAdded = Object.assign({}, state, {
        cardAdded: (new Date()).getTime()
      })

      return cardAdded
    case types.IMAGE_UPDATED:
      let imageUpdated = Object.assign({}, state, {
        imageUpdated: (new Date()).getTime()
      })

      return imageUpdated
    case types.GAME_DETAILS_CHANGED:
      let gameDetailsChanged = Object.assign({}, state, {
        gameDetailsChanged: (new Date()).getTime()
      })

      return gameDetailsChanged
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
