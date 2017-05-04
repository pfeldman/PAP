import * as types from '../constants/ActionsTypes'

function Agrupando (state = {}, action) {
  switch (action.type) {
    case types.AGRUPANDO_DROP:
      let dropped = Object.assign({}, state, {
        element: action.el,
        timestamp: (new Date()).getTime(),
        category: action.category
      })

      return dropped
    case types.RESET_AGRUPANDO:
      let reset = Object.assign({}, state, {
        reset: action.el,
        resetTimestamp: (new Date()).getTime()
      })

      return reset
    case types.AGRUPANDO_CORRECT:
      let elements = state.elements
      if (!elements) {
        elements = []
      }
      elements.push({
        object: action.el,
        category: action.title
      })
      let correct = Object.assign({}, state, {
        elements: elements,
        elementsTimeStamp: (new Date()).getTime()
      })

      return correct
    case types.AGRUPANDO_RESET:
      let resetAll = Object.assign({}, state, {
        elements: []
      })

      return resetAll
    default:
      return state
  }
}

export default Agrupando
