import * as types from '../constants/ActionsTypes'

export function login (accounts) {
  localStorage.setItem('loggedIn', true)
  return {
    type: types.LOGIN,
    loggedIn: true
  }
}
