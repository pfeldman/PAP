import * as types from '../constants/ActionsTypes'

export function setLevel (level) {
  return {
    type: types.ADMIN_LEVEL,
    level
  }
}

export function setArea (area) {
  return {
    type: types.ADMIN_AREA,
    area
  }
}

export function setGame (game) {
  return {
    type: types.ADMIN_GAME,
    game
  }
}
