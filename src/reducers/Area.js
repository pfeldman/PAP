import * as types from '../constants/ActionsTypes'

function Area (state = {}, action) {
  switch (action.type) {
    case types.AREA:
      let area = Object.assign({}, state, {
        area: action.area
      })

      return area
    default:
      return state
  }
}

export default Area
