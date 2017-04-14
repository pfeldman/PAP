import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'
import CircuitsCard from '../components/CircuitsCard'
import CircuitDraggableCard from '../components/CircuitDraggableCard'

class Circuitos extends React.Component {
  render = () => {
    const { gameDetails, corrects } = this.props
    if (gameDetails) {
      if (corrects === gameDetails.length) {
        alert('GANASTE')
      }
      const max = parseInt(_.max(gameDetails, detail => {
        return detail.posicion
      }).posicion, 10)
      const cards = new Array(max)
      cards.fill(null)
      const windowSize = window.innerWidth * (90 - (6*cards.length)) / 100
      return (
        <div className='circuitosContainer'>
          <div className='availableSpaces'>
            {cards.map((card, index) => {
              if (index + 1 < cards.length) {
                return (
                  <div key={'circuitsCard-' + index}>
                    <CircuitsCard index={index + 1} width={windowSize / cards.length} />
                    <img
                      className='connected'
                      style={{
                        marginTop: ((windowSize / cards.length) + ((windowSize / cards.length) / 2)) / 2,
                        position: 'relative',
                        top: (((((windowSize / cards.length) + ((windowSize / cards.length) / 2)) / 2) * 41) / 100) / -2
                      }}
                      src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAArCAYAAADMr156AAAACXBIWXMAAAsSAAALE' +
                        'gHS3X78AAABl0lEQVRo3u3XsWrDMBAG4N+SQiAE8gqakq1Lhr5DKR3btRjkQB+nSzGBdOsDlNK3yNbFgU59gU6ebF+' +
                        'XGkyIE8dRhtPlB23HgT4kHQIRgdNKkuTxHH0V+OU1juMn3005QkBr/ewbgyVElmXaNwZLiDzPvWOwhDgHBlsI3xisI' +
                        'XxisIfwhREExDaGc+5FLEQTA4Bzzr2JhdjCuD8GIziIvhhBQjQxiOghjuP3Q/VRkiTEbZPr9bpz7Wg0wnQ6paqqPla' +
                        'r1d1eiGMac0wXDAUByfMcm80mUkrdtl0TERBNjKIobnZhiIFoPqC7MERBAEBZljsxxEG0YYiEEP1YNqO1xmw2K40xn' +
                        '/U4VRcEgSeiDUEUxD4EMRCHEADAAMB8Pg/201UjDIfD7+Vy2frpMmmaRpwQFosF9UFQSl2LHJ/bCGma/oqD+EdAV4Q' +
                        'gIWqEwWDw0xUhOIgmgjHmqitCUBCnIAQFYa3tjRAMhLUW4/G4N0IQENZaTCaTkxDYQ/hCYA3hE4EthG8EthC+EVhCE' +
                        'NGXbwQAiIgIlwB/6BrJoOfCr4AAAAAASUVORK5CYII='}
                      />
                  </div>
                )
              }
              return (
                <div key={'circuitsCard-' + index}>
                  <CircuitsCard index={index + 1} key={'circuitsCard-' + index} width={windowSize / cards.length} />
                </div>
              )
            })}
          </div>
          <div className='availableCards'>
            {gameDetails.map((card, index) => (
              <CircuitDraggableCard
                key={'CircuitDraggableCard-' + index}
                width={windowSize / gameDetails.length}
                card={card}
              />
            ))}
          </div>
        </div>
      )
    } else {
      return <div>LOADING</div>
    }
  }
}

Circuitos.propTypes = {
  dispatch: PropTypes.func,
  gameDetails: PropTypes.array,
  corrects: PropTypes.number
}

function mapStateToProps (state) {
  return {
    gameDetails: state.Game.gameDetails,
    corrects: state.Circuit.correct
  }
}

export default connect(mapStateToProps)(Circuitos)
