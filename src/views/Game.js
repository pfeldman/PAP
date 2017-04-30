import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { getGameKeys } from '../actions/Game'
import MemoTest from './MemoTest'
import Circuitos from './Circuitos'

class Game extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isWinner: false,
      time: 0,
      isLooser: false,
      nearLoose: false
    }
  }

  componentDidMount = () => {
    const { dispatch, game, area, level, levels } = this.props
    const time = levels[level - 1].time

    this.setState({
      time: time
    })
    dispatch(getGameKeys(game, area, level))
  }

  componentDidUpdate = (prevProps) => {
    const { newWin, gameDetails } = this.props
    if (prevProps.newWin !== newWin) {
      this.setState({
        isWinner: true
      })
      this.refs.tick.pause()
    }

    if (gameDetails !== prevProps.gameDetails && gameDetails) {
      window.setInterval(() => {
        if (gameDetails && !this.state.isWinner && !this.state.isLooser) {
          if (this.state.time === 1) {
            this.setState({
              isLooser: true,
              time: 0
            })
          } else {
            if (this.state.time === 13) {
              this.setState({
                time: this.state.time - 1,
                nearLoose: true
              })
            } else if (this.state.time === 1) {
              this.setState({
                time: this.state.time - 1,
                nearLoose: false
              })
            } else {
              this.setState({
                time: this.state.time - 1
              })
            }
          }
        }
      }, 1000)
    }
  }

  closeGmae = () => {
    location.reload()
  }

  getHeader = () => {
    const { time } = this.state
    const { gameDetails } = this.props
    let text = ''
    if (gameDetails) {
      text = gameDetails[0].texto
    }
    if (time === 12) {
      this.refs.tick.play()
    }
    let timeNiceMin = Math.floor(time/60)
    let timeNiceSecs = time
    if (timeNiceMin > 0) {
      timeNiceSecs = timeNiceSecs - 60
    }
    if (timeNiceSecs.toString().length === 1) {
      timeNiceSecs = '0' + timeNiceSecs
    }

    if (timeNiceMin < 0) {
      timeNiceMin = 0
    }
    if (timeNiceSecs < 0) {
      timeNiceSecs = 0
    }
    const header = (
      <div className='gameHeader'>
        <div className='counterContainer'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='209'
            height='170'
            viewBox='0 0 269 170'
            className={time <= 12 ? 'timeless': ''}
          >
            <defs>
              <path id='a' d='M268.613 169.481H.887V.225h267.726z'/>
            </defs>
            <g fill='none' fill-rule='evenodd'>
              <path
                className='pathColor'
                fill='rgba(0, 0, 0, .15)'
                d={'M45.802 157.719c60.017 21.658 138.287 12.187 188.579-16.445 61.265-34.882 31.246-98.787-28.708-' +
                  '125.466C140.79-13.083 69.488.271 27.843 40.858c-37.472 36.503-41.383 89.744 17.96 116.86'}
              />
              <path
                stroke='#000'
                strokeWidth='.65'
                d={'M45.802 157.719c60.017 21.658 138.287 12.187 188.579-16.445 61.265-34.882 31.246-98.787-28.708-' +
                  '125.466C140.79-13.083 69.488.271 27.843 40.858c-37.472 36.503-41.383 89.744 17.96 116.86'}
              />
              <path
                stroke='#000'
                strokeDasharray='1.939599978923798,1.289599978923798'
                strokeWidth='.65'
                d='M231.234 146.262c57.945-34.805 29.023-96.714-29.147-123.504'
              />
              <g className='clock' fill='#FFF'>
                <path d={'M47.115 66.88c10.76 0 19.527 8.801 19.527 19.604 0 10.802-8.767 19.605-19.527 19.605-10.7' +
                  '6 0-19.527-8.803-19.527-19.605 0-10.847 8.767-19.604 19.527-19.604M24 86.44c0 12.803 10.362 23.2' +
                  '05 23.114 23.205S70.228 99.243 70.228 86.44c0-6.356-2.567-12.18-6.73-16.358l1.815-1.823.842.845a' +
                  '1.77 1.77 0 0 0 1.284.533c.487 0 .93-.177 1.284-.533a1.829 1.829 0 0 0 0-2.579l-4.206-4.223a1.81' +
                  '2 1.812 0 0 0-2.568 0 1.829 1.829 0 0 0 0 2.58l.841.843-1.993 2c-3.365-2.49-7.394-4.045-11.823-4' +
                  '.4v-1.556h4.03a1.8 1.8 0 0 0 1.815-1.822 1.799 1.799 0 0 0-1.815-1.823H41.049c-1.02 0-1.815.8-1.' +
                  '815 1.823 0 1.022.796 1.822 1.815 1.822h4.295v1.555C33.389 64.257 24 74.26 24 86.44'}
                />
                <path d={'M47.115 87.951h7.749a1.8 1.8 0 0 0 1.815-1.822 1.8 1.8 0 0 0-1.815-1.823H48.93v-9.38a1.8 ' +
                  '1.8 0 0 0-1.815-1.823 1.8 1.8 0 0 0-1.816 1.823v11.247c0 .978.798 1.778 1.816 1.778'}
                />
              </g>
            </g>
          </svg>
          <label className={'time ' + (this.state.nearLoose ? 'loosing' : '')}>
            {timeNiceMin}:{timeNiceSecs}
          </label>
          </div>
          <label className='gameObjective'>{text}</label>
          <div className='closeGame' onClick={this.closeGmae}>
            <svg
              className='closeGameIcon'
              xmlns='http://www.w3.org/2000/svg'
              width='170'
              height='168'
              viewBox='0 0 170 168'
            >
              <g fill='none' fill-rule='evenodd'>
                <path
                  className='closeBg'
                  fill='rgba(0,0,0,.15)'
                  d={'M31.927 156.365c37.108 20.799 85.502 11.703 116.597-15.793 37.88-33.498 19.32-94.868-17.75-12' +
                    '0.488C90.657-7.662 46.572 5.162 20.824 44.139c-23.17 35.056-25.588 86.185 11.103 112.226'
                }/>
                <path
                  stroke='#000'
                  strokeDasharray='1.492,0.992'
                  strokeWidth='.5'
                  d='M143.02 140.397c35.827-33.425 17.945-92.878-18.021-118.605'
                />
                <path
                  stroke='#000'
                  strokeWidth='.5'
                  d={'M28.369 151.399c37.108 20.799 85.502 11.703 116.597-15.793 37.88-33.498 19.319-94.868-17.75-1' +
                    '20.488C87.099-12.628 43.014.196 17.265 39.173c-23.17 35.056-25.587 86.185 11.104 112.226'
                }/>
                <path
                  fill='#FFF'
                  d={'M70.836 110.936l-4.378-4.378a4.696 4.696 0 0 1 0-6.64L97.957 68.42a4.696 4.696 0 0 1 6.64 0l4' +
                    '.378 4.379a4.694 4.694 0 0 1 0 6.64l-31.499 31.498a4.694 4.694 0 0 1-6.64 0'}/>
                <path
                  fill='#FFF'
                  d={'M108.975 106.559l-4.378 4.378a4.696 4.696 0 0 1-6.64 0l-31.499-31.5a4.696 4.696 0 0 1 0-6.64l' +
                    '4.378-4.377a4.694 4.694 0 0 1 6.64 0l31.499 31.499a4.694 4.694 0 0 1 0 6.64'}/>
              </g>
            </svg>

          </div>
      </div>
    )

    if (gameDetails) {
      return header
    }
    return null
  }

  render = () => {
    const { game } = this.props
    let gameUI
    switch (game) {
      case 'memoTest':
        gameUI = <MemoTest />
        break
      case 'circuitos':
        gameUI = <Circuitos />
        break
    }
    let won = null
    let loose = null
    if (this.state.isWinner) {
      won = (
        <div className='won' onClick={this.closeGmae}>
        </div>
      )
    } else if (this.state.isLooser) {
      loose = (
        <div className='loose' onClick={this.closeGmae}>
        </div>
      )
    }

    return (
      <div>
        <audio ref='tick' src='http://pasitoapaso.themonstera.com/tick.mp3' preload='auto' />
        {this.getHeader()}
        {gameUI}
        {won}
        {loose}
      </div>
    )
  }
}

Game.propTypes = {
  dispatch: PropTypes.func,
  game: PropTypes.string,
  area: PropTypes.string,
  level: PropTypes.number,
  newWin: PropTypes.number,
  levels: PropTypes.array,
  gameDetails: PropTypes.array
}

function mapStateToProps (state) {
  return {
    game: state.Game.game,
    area: state.Area.area,
    level: state.SessionService.level,
    newWin: state.Game.win,
    levels: state.Levels.options,
    gameDetails: state.Game.gameDetails
  }
}

export default connect(mapStateToProps)(Game)
