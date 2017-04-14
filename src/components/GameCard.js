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
    let text = ''
    if (type === 'agrupando') {
      text = 'AGRU-\nPANDO'
    } else if (type === 'circuitos') {
      text = 'CIR-\nCUITOS'
    }

    return (
      <div className={'gameCard ' + type} onClick={this.selectGame}>
        <div className='cardContent'>
          <span>{text.split('\n')[0]}</span>
          <span>{text.split('\n')[1]}</span>
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
