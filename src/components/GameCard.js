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

    return (
      <div className={'gameCard ' + type} onClick={this.selectGame}>

      </div>
    )
  }
}

GameCard.propTypes = {
  dispatch: PropTypes.func,
  type: PropTypes.string
}

export default connect()(GameCard)
