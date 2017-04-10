import * as types from '../constants/ActionsTypes'
import { servicePost } from '../utils/serviceFetch'

export function selectGame (game) {
  return {
    type: types.GAME,
    game
  }
}

function gameKeysReceived (response) {
  return {
    type: types.GAME_DATAILS,
    payload: response
  }
}

function postGameKeys (game, area, level) {
  return servicePost('getGameKeys', {
    game,
    area,
    level
  })
}

export function getGameKeys (game, area, level) {
  return dispatch => {
    postGameKeys(game, area, level).then(
      response => dispatch(gameKeysReceived(response))
    )
  }
}
