import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'
import CircuitsCard from '../components/CircuitsCard'
import CircuitDraggableCard from '../components/CircuitDraggableCard'
import { win } from '../actions/Game'
import Loading from '../components/Loading'

class Circuitos extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      details: []
    }
  }

  componentDidUpdate = (prevProps) => {
    const { gameDetails, corrects, dispatch } = this.props

    if (gameDetails) {
      if (corrects === gameDetails.length) {
        dispatch(win())
      }

      if (gameDetails !== prevProps.gameDetails) {
        const copy = JSON.parse(JSON.stringify(gameDetails))
        let shuffled = []
        while (copy.length) {
          let position = Math.floor((Math.random() * copy.length))
          shuffled.push(copy[position])
          copy.splice(position, 1)
        }

        this.setState({
          details: shuffled
        })
      }
    }
  }

  ok = () => {
    const { okSound } = this.refs
    const { sound } = this.props
    if (sound) {
      okSound.pause()
      okSound.currentTime = 0
      okSound.play()
    }
  }

  fail = () => {
    const { failSound } = this.refs
    const { sound } = this.props
    if (sound) {
      failSound.pause()
      failSound.currentTime = 0
      failSound.play()
    }
  }

  circuitsCard = (index, windowSize, cards) => {
    return (
      <CircuitsCard
        index={index + 1}
        key={'circuitsCard-' + index}
        width={windowSize / cards.length}
        ok={this.ok.bind(this)}
        fail={this.fail.bind(this)}
      />
    )
  }

  render = () => {
    const { gameDetails } = this.props
    if (gameDetails && this.state.details.length) {
      const max = parseInt(_.max(gameDetails, detail => {
        return detail.posicion
      }).posicion, 10)
      const cards = new Array(max)
      cards.fill(null)
      const windowSize = window.innerWidth * 90 / 100
      const width = (windowSize / gameDetails.length) - (windowSize * 2 / 100)

      return (
        <div className='circuitosContainer'>
          <audio ref='okSound' src='http://pasitoapaso.themonstera.com/ok.mp3' preload='auto' />
          <audio ref='failSound' src='http://pasitoapaso.themonstera.com/fail.mp3' preload='auto' />
          <div className='availableSpaces'>
            {cards.map((card, index) => {
              return (
                <div key={'circuitsCard-' + index}>
                  <CircuitsCard
                    index={index + 1}
                    width={width}
                    ok={this.ok}
                    fail={this.fail}
                  />
                </div>
              )
            })}
          </div>
          <div className='availableCards' style={{
            'paddingLeft': '5%',
            'height': (width / 82 * 100) + 40
          }}>
            {this.state.details.map((card, index) => (
              <div className='pull-left cardCircuitContainer' key={'CircuitDraggableCard-' + index}>
                <CircuitDraggableCard
                  width={(windowSize / gameDetails.length) - (windowSize * 2 / 100)}
                  card={card}
                />
                <div
                  className='space'
                  style={{
                    width: (windowSize / gameDetails.length) - (windowSize * 2 / 100),
                    height: ((windowSize / gameDetails.length) - (windowSize * 2 / 100)) / 82 * 100
                  }}
                >
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    } else {
      return (
        <Loading />
      )
    }
  }
}

Circuitos.propTypes = {
  dispatch: PropTypes.func,
  gameDetails: PropTypes.array,
  corrects: PropTypes.number,
  sound: PropTypes.bool
}

function mapStateToProps (state) {
  return {
    gameDetails: state.Game.gameDetails,
    corrects: state.Circuit.correct,
    sound: state.Game.sound
  }
}

export default connect(mapStateToProps)(Circuitos)
