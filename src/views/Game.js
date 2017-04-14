import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { getGameKeys } from '../actions/Game'
import MemoTest from './MemoTest'
import Circuitos from './Circuitos'

class Game extends React.Component {
  componentDidMount = () => {
    const { dispatch, game, area, level } = this.props

    dispatch(getGameKeys(game, area, level))
  }

  render = () => {
    const { game } = this.props
    switch (game) {
      case 'memoTest':
        return <MemoTest />
      case 'circuitos':
        return <Circuitos />
    }
  }
}

Game.propTypes = {
  dispatch: PropTypes.func,
  game: PropTypes.string,
  area: PropTypes.string,
  level: PropTypes.number
}

function mapStateToProps (state) {
  return {
    game: state.Game.game,
    area: state.Area.area,
    level: state.SessionService.level
  }
}

export default connect(mapStateToProps)(Game)
