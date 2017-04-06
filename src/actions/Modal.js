import * as types from '../constants/ActionsTypes'

export function modal (visible=false, content) {
  return {
    type: types.MODAL,
    visible,
    content
  }
}
