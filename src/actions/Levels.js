import * as types from '../constants/ActionsTypes'
import { servicePost } from '../utils/serviceFetch'

function levelsSuccessful (response) {
  return {
    type: types.LEVELS,
    response
  }
}

function fetchLevels () {
  return servicePost('levels', null, 'GET')
}

export function getLevels () {
  return dispatch => {
    fetchLevels().then(
      response => dispatch(levelsSuccessful(response))
    )
  }
}
