import React from 'react'
import GameCard from '../components/GameCard'

class GameSelector extends React.Component {
  render = () => {
    return (
      <div className='cardContainer'>
        <h1>¿A qué juego quieres jugar hoy?</h1>
        <div className='spacer' />
        <GameCard type='memoTest' />
        <GameCard type='agrupando' />
        <GameCard type='circuitos' />
      </div>
    )
  }
}

export default GameSelector
