import * as types from '../constants/ActionsTypes'

export function flip (id) {
  return {
    type: types.FLIP_MEMO_TEST,
    id
  }
}

export function save (id) {
  return {
    type: types.SAVE_CORRECT_MEMO_TEST,
    id
  }
}

export function memoTestReset () {
  return {
    type: types.MEMOTEST_RESET
  }
}
