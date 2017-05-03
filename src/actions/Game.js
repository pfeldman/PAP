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

export function setSound (status) {
  return {
    type: types.SOUND,
    status
  }
}

export function retryGame () {
  return {
    type: types.RETRY
  }
}

export function getGameKeys (game, area, level) {
  return dispatch => {
    postGameKeys(game, area, level).then(
      response => dispatch(gameKeysReceived(response))
    )
  }
}

export function win () {
  return {
    type: types.WIN
  }
}

export function reset () {
  return {
    type: types.RESET
  }
}
