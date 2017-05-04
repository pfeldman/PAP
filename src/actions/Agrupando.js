import * as types from '../constants/ActionsTypes'

export function dropCard (el, category) {
  return {
    type: types.AGRUPANDO_DROP,
    el,
    category
  }
}

export function resetCard (el) {
  return {
    type: types.RESET_AGRUPANDO,
    el
  }
}

export function correct (el, title) {
  return {
    type: types.AGRUPANDO_CORRECT,
    el,
    title
  }
}

export function agrupandoReset () {
  return {
    type: types.AGRUPANDO_RESET
  }
}
