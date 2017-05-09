import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectGame } from '../actions/Game'

class GameCard extends React.Component {
  selectGame = () => {
    const { type, dispatch } = this.props
    dispatch(selectGame(type))
  }

  render = () => {
    const { type } = this.props
    let title = ''
    let text = ''
    if (type === 'memoTest') {
      title = 'Memotest'
      text = 'El juego consiste en encontrar las cartas que son iguales.'
    } else if (type === 'agrupando') {
      title = 'Grupitos'
      text = 'El juego consiste en armar grupos de cartas.'
    } else if (type === 'circuitos') {
      title = 'Circuitos'
      text = 'El juego consiste en poner las cartas en orden.'
    }
    return (
      <div className='col-md-6'>
        <div className={'gameCard ' + type} onClick={this.selectGame}>
          <div className='cardContent'>
            <div className='col-md-5'>
            </div>
            <div className='col-md-7 rightInfo'>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

GameCard.propTypes = {
  dispatch: PropTypes.func,
  type: PropTypes.string,
  level: PropTypes.number,
  areasLoaded: PropTypes.number
}

function mapStateToProps (state) {
  return {
    areasLoaded: state.SessionService.timestamp
  }
}

export default connect(mapStateToProps)(GameCard)
