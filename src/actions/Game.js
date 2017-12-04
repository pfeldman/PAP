import * as types from '../constants/ActionsTypes'
import { servicePost } from '../utils/serviceFetch'

export function selectGame (game) {
  return {
    type: types.GAME,
    game
  }
}

function gameKeysFail () {
  return {
    type: types.GAME_FAIL
  }
}

function gameKeysReceived (response) {
  return {
    type: types.GAME_DATAILS,
    payload: response
  }
}

function colorChanged () {
  return {
    type: types.BACKGROUND_CHANGED
  }
}

function secondaryChanged () {
  return {
    type: types.SECUNDARY_CHANGED
  }
}

function descriptionChanged () {
  return {
    type: types.DESCRIPTION_CHANGED
  }
}

function textChanged () {
  return {
    type: types.TEXT_CHANGED
  }
}

function gameDetailsChanged () {
  return {
    type: types.GAME_DETAILS_CHANGED
  }
}

function cardAdded () {
  return {
    type: types.CARD_ADDED
  }
}

function imageUpdated () {
  return {
    type: types.IMAGE_UPDATED
  }
}

function imageDeleted () {
  return {
    type: types.IMAGE_DELETED
  }
}

function postNewBackgroound (background, game, area, level) {
  return servicePost('setNewBackground', {
    background,
    game,
    area,
    level
  })
}

function postSecondaryColor (secondaryColor, game, area, level) {
  return servicePost('setNewSecondaryColor', {
    secondaryColor,
    game,
    area,
    level
  })
}

function postDescription (description, game, area, level) {
  const encodedDescription = description.replace(
    /á/g, '&aacute;',
    /é/g, '&eacute;',
    /í/g, '&iacute;',
    /ó/g, '&óacute;',
    /ú/g, '&uacute;',
    /Á/g, '&Aacute;',
    /É/g, '&Eacute;',
    /Í/g, '&Iacute;',
    /Ó/g, '&Oacute;',
    /Ú/g, '&Uacute;'
  )
  return servicePost('setNewDescription', {
    description: encodedDescription,
    game,
    area,
    level
  })
}

function postText (text, game, area, level) {
  const encodedText = text.replace(
    /á/g, '&aacute;',
    /é/g, '&eacute;',
    /í/g, '&iacute;',
    /ó/g, '&óacute;',
    /ú/g, '&uacute;',
    /Á/g, '&Aacute;',
    /É/g, '&Eacute;',
    /Í/g, '&Iacute;',
    /Ó/g, '&Oacute;',
    /Ú/g, '&Uacute;'
  )
  return servicePost('setNewText', {
    text: encodedText,
    game,
    area,
    level
  })
}

function postNewCard (game, area, level, background, secondaryColor, description, texto) {
  return servicePost('sendNewCard', {
    game,
    area,
    level,
    background,
    secondaryColor,
    description,
    texto
  })
}

function postNewImage (game, id, image) {
  return servicePost('setNewImage', {
    game,
    id,
    image
  })
}

function deleteImage (id, game) {
  return servicePost('deleteImage', {
    game,
    id
  })
}

function postGameDetails (game, id, details, value) {
  const valueEncoded = value.replace(
    /á/g, '&aacute;',
    /é/g, '&eacute;',
    /í/g, '&iacute;',
    /ó/g, '&óacute;',
    /ú/g, '&uacute;',
    /Á/g, '&Aacute;',
    /É/g, '&Eacute;',
    /Í/g, '&Iacute;',
    /Ó/g, '&Oacute;',
    /Ú/g, '&Uacute;'
  )
  return servicePost('sendGameDetailsKeys', {
    game,
    id,
    details,
    value: valueEncoded
  })
}

function postGameKeys (game, area, level, type) {
  return servicePost('getGameKeys', {
    game,
    area,
    level,
    type
  })
}

export function setSound (status) {
  return {
    type: types.SOUND,
    status
  }
}

export function retryGame () {
  return {
    type: types.RETRY
  }
}

export function getGameKeys (game, area, level, type) {
  return dispatch => {
    postGameKeys(game, area, level, type).then(
      response => dispatch(gameKeysReceived(response))
    ).fail(() => dispatch(gameKeysFail()))
  }
}

export function win () {
  return {
    type: types.WIN
  }
}

export function reset () {
  return {
    type: types.RESET
  }
}

export function setBackground (background, game, area, level) {
  return dispatch => {
    postNewBackgroound(background, game, area, level).then(
      () => dispatch(colorChanged())
    )
  }
}

export function setSecondary (secondaryColor, game, area, level) {
  return dispatch => {
    postSecondaryColor(secondaryColor, game, area, level).then(
      () => dispatch(secondaryChanged())
    )
  }
}

export function setDescription (description, game, area, level) {
  return dispatch => {
    postDescription(description, game, area, level).then(
      () => dispatch(descriptionChanged())
    )
  }
}

export function setText (text, game, area, level) {
  return dispatch => {
    postText(text, game, area, level).then(
      () => dispatch(textChanged())
    )
  }
}

export function detailsChanged (game, id, details, value) {
  return dispatch => {
    postGameDetails(game, id, details, value).then(
      () => dispatch(gameDetailsChanged())
    )
  }
}

export function newCard (game, area, level, background, secondaryColor, description, texto) {
  return dispatch => {
    postNewCard(game, area, level, background, secondaryColor, description, texto).then(
      () => dispatch(cardAdded())
    )
  }
}

export function updateImage (game, id, image) {
  return dispatch => {
    postNewImage(game, id, image).then(
      () => dispatch(imageUpdated())
    )
  }
}

export function deleteCard (id, game) {
  return dispatch => {
    deleteImage(id, game).then(
      () => dispatch(imageDeleted())
    )
  }
}
