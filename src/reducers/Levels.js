import * as types from '../constants/ActionsTypes'

function Levels (state = {}, action) {
  switch (action.type) {
    case types.LEVELS:
      let options = []
      Object.keys(action.response).map(key => {
        options.push({
          value: key,
          label: action.response[key]
        })
      })
      let levels = Object.assign({}, state, {
        options
      })

      return levels
    default:
      return state
  }
}

export default Levels
