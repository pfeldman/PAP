import * as types from '../constants/ActionsTypes'
import { servicePost } from '../utils/serviceFetch'

function loginError () {
  return {
    type: types.LOGIN_ERROR
  }
}

function adminLoginError () {
  return {
    type: types.ADMIN_LOGIN_ERROR
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

function adminLoginSuccessful (response) {
  localStorage.setItem('adminLoggedIn', true)

  return {
    type: types.ADMIN_LOGIN
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

function adminLoginAttempt (username, password) {
  return servicePost('adminLogin', {
    username: username,
    password: password
  })
}

function gameAvailableAreas () {
  return servicePost('getGameAvailableAreas', {})
}

function allGameDetails () {
  return servicePost('getAllGameDetails', {})
}

function gmaeAreas (game, level) {
  return servicePost('getGameAreas', {
    game,
    level
  })
}

function gameDetails (response) {
  return {
    type: types.GAME_DETAILS,
    payload: response
  }
}

function availableAreas (response) {
  return {
    type: types.AVAILABLE_AREAS,
    payload: response
  }
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

export function adminLogin (username, password) {
  return dispatch => {
    adminLoginAttempt(username, password).then(
      response => dispatch(adminLoginSuccessful(response))
    ).fail(response => dispatch(adminLoginError()))
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

export function getGameAvailableAreas () {
  return dispatch => {
    gameAvailableAreas().then(
      response => dispatch(availableAreas(response))
    )
  }
}

export function getAllGameDetails () {
  return dispatch => {
    allGameDetails().then(
      response => dispatch(gameDetails(response))
    )
  }
}
