import React, { PropTypes } from 'react'

class GameCard extends React.Component {
  render = () => {
    const { type } = this.props

    return (
      <div className={'gameCard ' + type}>

      </div>
    )
  }
}

GameCard.propTypes = {
  type: PropTypes.string
}

export default GameCard
