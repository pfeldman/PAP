import * as types from '../constants/ActionsTypes'

function Alert (state = {}, action) {
  switch (action.type) {
    case types.ALERT:
      let alert = Object.assign({}, state, {
        message: action.message,
        action: action.action,
        buttonOKText: action.buttonOKText,
        buttonCloseText: action.buttonCloseText,
        new: (new Date()).getTime()
      })

      return alert
    case types.CLOSE_ALERT:
      let closed = Object.assign({}, state, {
        new: undefined
      })

      return closed
    default:
      return state
  }
}

export default Alert
