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
      text = 'Consiste encontrar los pares de cartas que contienen los mismos dibujos'
    } else if (type === 'agrupando') {
      title = 'Agrupando'
      text = 'Consiste encontrar los pares de cartas que contienen los mismos dibujos'
    } else if (type === 'circuitos') {
      title = 'Circuitos'
      text = 'Consiste encontrar los pares de cartas que contienen los mismos dibujos'
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
  type: PropTypes.string
}

export default connect()(GameCard)
