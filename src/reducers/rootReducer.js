import { combineReducers } from 'redux'
import SessionService from './SessionService'
import Modal from './Modal'
import Levels from './Levels'
import Game from './Game'
import Area from './Area'
import MemoTest from './MemoTest'
import Circuit from './Circuit'

export default combineReducers({
  SessionService,
  Modal,
  Levels,
  Game,
  Area,
  MemoTest,
  Circuit
})
