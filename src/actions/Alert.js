import * as types from '../constants/ActionsTypes'

export function alert (message, action, buttonOKText, buttonCloseText) {
  return {
    type: types.ALERT,
    message, action, buttonOKText, buttonCloseText
  }
}

export function closeAlert () {
  return {
    type: types.CLOSE_ALERT
  }
}
