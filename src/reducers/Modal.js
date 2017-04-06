import * as types from '../constants/ActionsTypes'

function Modal (state = {}, action) {
  switch (action.type) {
    case types.MODAL:
      let modal = Object.assign({}, state, {
        visible: action.visible,
        content: action.content
      })

      return modal
    default:
      return state
  }
}

export default Modal
