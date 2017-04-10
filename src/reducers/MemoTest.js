import * as types from '../constants/ActionsTypes'

function MemoTest (state = {}, action) {
  switch (action.type) {
    case types.FLIP_MEMO_TEST:
      let flip = Object.assign({}, state, {
        flipped: parseInt(action.id, 10)
      })

      return flip
    case types.SAVE_CORRECT_MEMO_TEST:
      let saved = state.saved.split(',')
      saved.push(action.id)
      saved = saved.join(',')
      let save = Object.assign({}, state, {
        saved: saved,
        flipped: -1
      })

      return save
    default:
      state = Object.assign({}, state, {
        flipped: -1,
        saved: ''
      })
      return state
  }
}

export default MemoTest
