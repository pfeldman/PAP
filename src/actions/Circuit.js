import * as types from '../constants/ActionsTypes'

export function dropCard (el, position) {
  return {
    type: types.CIRCUIT_DROP,
    el,
    position
  }
}

export function resetCard (el) {
  return {
    type: types.RESET_CIRCUIT,
    el
  }
}

export function correct () {
  return {
    type: types.CIRCUIT_CORRECT
  }
}
