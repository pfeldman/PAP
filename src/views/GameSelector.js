import React, { PropTypes } from 'react'
import GameCard from '../components/GameCard'

class GameSelector extends React.Component {
  render = () => {
    const { level } = this.props
    return (
      <div className='cardContainer container'>
        <div classsName='row'>
          <GameCard type='memoTest' level={level} />
          <GameCard type='agrupando' level={level} />
          <GameCard type='circuitos' level={level} />
        </div>
      </div>
    )
  }
}

GameSelector.propTypes = {
  level: PropTypes.number
}

export default GameSelector
