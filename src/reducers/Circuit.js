import * as types from '../constants/ActionsTypes'

function Circuit (state = {}, action) {
  switch (action.type) {
    case types.CIRCUIT_DROP:
      let dropped = Object.assign({}, state, {
        element: action.el,
        timestamp: (new Date()).getTime(),
        position: action.position
      })

      return dropped
    case types.RESET_CIRCUIT:
      let reset = Object.assign({}, state, {
        reset: action.el,
        resetTimestamp: (new Date()).getTime()
      })

      return reset
    case types.CIRCUIT_CORRECT:
      let corrects = state.correct
      if (!corrects) {
        corrects = 0
      }
      let correct = Object.assign({}, state, {
        correct: corrects + 1
      })

      return correct
    default:
      let def = Object.assign({}, state, {
        correct: 0
      })

      return def
  }
}

export default Circuit
