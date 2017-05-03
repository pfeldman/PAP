import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import Modal from '../components/Modal'
import { modal } from '../actions/Modal'
import LevelSelector from '../components/LevelSelector'
import { updateLevel } from '../actions/SessionService'
import Footer from '../components/Footer'
import GameSelector from './GameSelector'
import AreaSelector from './AreaSelector'
import Game from './Game'

class Dashboard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      modalShown: false
    }
  }
  componentDidUpdate = (prevProps) => {
    this.showLevelModal(false, prevProps)
  }

  componentDidMount = () => {
    this.showLevelModal(true)
  }

  showLevelModal = (force, prevProps) => {
    const { level, dispatch, name, levels } = this.props
    if (!level && levels && (force || !force && prevProps.levels !== levels)) {
      this.setState({
        modalShown: true
      })
      dispatch(modal(true, (
        <div className='levelSelector'>
          <b>Bienvenido/a {name}!</b><br />
          Parece que es la primera vez que nos vemos! Elegí tu grado para empezar:
          <LevelSelector
            options={levels}
            onChange={this.onSelect}
          />
        </div>
      )))
    }
  }

  updateLevel = (username, level) => {
    const { dispatch } = this.props

    dispatch(updateLevel(username, level))
  }

  onSelect = (param) => {
    const { value } = param
    const { username } = this.props
    this.updateLevel(username, value)
    this.setState({
      modalShown: false
    })
  }

  get dashboardContent () {
    const { game, area } = this.props
    if (game && area) {
      return <Game />
    } else if (game) {
      return (
        <div>
          <Footer />
          <GameSelector />
          <AreaSelector />
        </div>
      )
    } else {
      return (
        <div>
          <Footer />
          <GameSelector />
        </div>
      )
    }
  }

  getStyle = () => {
    const { game, area, gameDetails } = this.props
    let ret = {}
    if (game && area && gameDetails && gameDetails[0].background) {
      let image = 'radial-gradient(circle at 50% 46%, rgba(' +
        gameDetails[0].background + ', 0.5), rgb(' + gameDetails[0].background + ')'
      ret = {
        'backgroundImage': image
      }
    }
    return ret
  }

  render = () => {
    const { level, game } = this.props
    if (this.state.modalShown) {
      return (
        <div className='loginView'>
          <Modal mandatory />
        </div>
      )
    } else {
      return (
        <div className={'dashboard level' + level + ' ' + game} style={this.getStyle()}>
          <div className='background-container'>
            {this.dashboardContent}
            <div className='warning'>
              Para poder disfrutar mejor del juego, por favor gire su dispositivo
            </div>
          </div>
        </div>
      )
    }
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func,
  name: PropTypes.string,
  level: PropTypes.number,
  levels: PropTypes.array,
  username: PropTypes.string,
  game: PropTypes.string,
  area: PropTypes.string,
  gameDetails: PropTypes.array
}

function mapStateToProps (state) {
  return {
    name: state.SessionService.name,
    level: state.SessionService.level,
    levels: state.Levels.options,
    username: state.SessionService.username,
    game: state.Game.game,
    area: state.Area.area,
    gameDetails: state.Game.gameDetails
  }
}

export default connect(mapStateToProps)(Dashboard)
