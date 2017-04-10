import * as types from '../constants/ActionsTypes'

export function selectArea (area) {
  return {
    type: types.AREA,
    area
  }
}
