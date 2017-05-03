import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'
import MemoTestCard from '../components/MemoTestCard'
import { flip, save } from '../actions/MemoTest'
import { win } from '../actions/Game'
import Loading from '../components/Loading'

class MemoTest extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      options: []
    }
  }

  flipped = (details) => {
    const { dispatch, flippedCard, sound } = this.props
    const { okSound, failSound } = this.refs
    if (flippedCard === -1) {
      dispatch(flip(details.id))
    } else {
      if (parseInt(details.id, 10) === flippedCard) {
        dispatch(save(flippedCard))
        if (sound) {
          okSound.pause()
          okSound.currentTime = 0
          okSound.play()
        }
      } else {
        dispatch(flip(-1))
        if (sound) {
          failSound.pause()
          failSound.currentTime = 0
          failSound.play()
        }
      }
    }
  }

  componentDidUpdate = (prevProps) => {
    const { gameDetails, correctCards, dispatch } = this.props

    let options = []
    if (gameDetails && !prevProps.gameDetails) {
      gameDetails.forEach(gameDetail => {
        options.push(gameDetail.id)
        options.push(gameDetail.id)
      })

      for (var i = options.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = options[i]
        options[i] = options[j]
        options[j] = temp
      }

      this.setState({
        options: options
      })
    }

    if (correctCards.substr(1, correctCards.length).split(',').length === gameDetails.length) {
      dispatch(win())
    }
  }

  render = () => {
    const { gameDetails, flippedCard, correctCards, resetedTime } = this.props
    if (gameDetails && this.state.options.length) {
      const columnsLength = gameDetails.length * 2 / 3
      const rowsLength = 3
      let options = _.clone(this.state.options)
      let rows = []
      let columns = []
      for (let i = 0; i < columnsLength; i++) {
        columns.push(i)
      }
      for (let i = 0; i < rowsLength; i++) {
        rows.push(i)
      }
      const windowSize = window.innerHeight * 67 / 100
      const margin = 8
      const height = windowSize / rowsLength - margin
      const width = height * 85 / 100
      return (
        <div className='memoTestGame'>
          <audio ref='okSound' src='http://pasitoapaso.themonstera.com/ok.mp3' preload='auto' />
          <audio ref='failSound' src='http://pasitoapaso.themonstera.com/fail.mp3' preload='auto' />
          {rows.map((row, index) => {
            return (
              <div
                className='row'
                key={'row' + index}
                style={{
                  paddingLeft: (window.innerWidth - (width * columnsLength + (margin * columnsLength))) / 2
                }}
              >
                {columns.map((column, columnIndex) => {
                  const optionIndex = 0
                  let option = options[optionIndex]
                  options.splice(optionIndex, 1)
                  const detail = _.find(gameDetails, gameDetail => gameDetail.id === option)
                  return (
                    <MemoTestCard
                      detail={detail}
                      key={'memoCard' + columnIndex}
                      height={height}
                      width={width}
                      onFlip={this.flipped.bind(this, detail)}
                      flipped={flippedCard}
                      correctCards={correctCards}
                      resetedTime={resetedTime}
                    />
                  )
                })}
              </div>
            )
          })}
        </div>
      )
    } else {
      return (
        <Loading />
      )
    }
  }
}

MemoTest.propTypes = {
  dispatch: PropTypes.func,
  gameDetails: PropTypes.array,
  flippedCard: PropTypes.number,
  correctCards: PropTypes.string,
  sound: PropTypes.bool,
  resetedTime: PropTypes.number
}

function mapStateToProps (state) {
  return {
    gameDetails: state.Game.gameDetails,
    flippedCard: state.MemoTest.flipped,
    correctCards: state.MemoTest.saved,
    resetedTime: state.MemoTest.resetedTime,
    sound: state.Game.sound
  }
}

export default connect(mapStateToProps)(MemoTest)
