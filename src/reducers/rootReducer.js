import { combineReducers } from 'redux'
import SessionService from './SessionService'
import Modal from './Modal'
import Levels from './Levels'

export default combineReducers({
  SessionService,
  Modal,
  Levels
})
