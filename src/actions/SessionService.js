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
  localStorage.setItem('username', response.username)

  return {
    type: types.LOGIN,
    name: response.name,
    level: response.level,
    username: response.username
  }
}

function levelUpdatedSuccessful (level) {
  localStorage.setItem('level', level)
  return {
    type: types.LEVEL_UPDATED,
    level: level
  }
}

function postUpdateLevel (username, level) {
  return servicePost('updateLevel', {
    username: username,
    level: level
  })
}

function loginAttempt (username, password) {
  return servicePost('login', {
    username: username,
    password: password
  })
}

function gmaeAreas (game, level) {
  return servicePost('getGameAreas', {
    game,
    level
  })
}

function areas (areas) {
  return {
    type: types.GET_AREAS,
    areas
  }
}

export function selectingGame () {
  return {
    type: types.SELECTING_GAME
  }
}

export function login (username, password) {
  return dispatch => {
    loginAttempt(username, password).then(
      response => dispatch(loginSuccessful(response))
    ).fail(response => dispatch(loginError()))
  }
}

export function updateLevel (username, level) {
  return dispatch => {
    postUpdateLevel(username, level).then(
      response => dispatch(levelUpdatedSuccessful(level))
    )
  }
}

export function getGameAreas (game, level) {
  return dispatch => {
    gmaeAreas(game, level).then(
      response => dispatch(areas(response))
    )
  }
}

export function logout () {
  localStorage.removeItem('loggedIn')
  localStorage.removeItem('name')
  localStorage.removeItem('level')
  localStorage.removeItem('username')

  return {
    type: types.LOGOUT
  }
}
