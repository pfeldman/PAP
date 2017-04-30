import React from 'react'
import GameCard from '../components/GameCard'

class GameSelector extends React.Component {
  render = () => {
    return (
      <div className='cardContainer container'>
        <div classsName='row'>
          <GameCard type='memoTest' />
          <GameCard type='agrupando' />
          <GameCard type='circuitos' />
        </div>
      </div>
    )
  }
}

export default GameSelector
