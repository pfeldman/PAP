import * as types from '../constants/ActionsTypes'
import { servicePost } from '../utils/serviceFetch'

function loginError () {
  return {
    type: types.LOGIN_ERROR
  }
}

function loginSuccessful (response) {
  localStorage.setItem('loggedIn', true)
  localStorage.setItem('name', response.name)
  localStorage.setItem('level', response.level)

  return {
    type: types.LOGIN,
    name: response.name,
    level: response.level
  }
}

function loginAttempt (username, password) {
  return servicePost('login', {
    username: username,
    password: password
  })
}

export function login (username, password) {
  return dispatch => {
    loginAttempt(username, password).then(
      response => dispatch(loginSuccessful(response))
    ).fail(response => dispatch(loginError()))
  }
}
