import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { getGameKeys } from '../actions/Game'
import MemoTest from './MemoTest'
import Agrupando from './Agrupando'
import Circuitos from './Circuitos'
import { reTry } from '../actions/Circuit'
import { memoTestReset } from '../actions/MemoTest'
import { agrupandoReset } from '../actions/Agrupando'
import $ from 'jquery'
import TweenLite from 'gsap/TweenLite'
import { Back } from '../utils/EasePack'
import { alert } from '../actions/Alert'

class Game extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isWinner: false,
      time: 0,
      isLooser: false,
      nearLoose: false,
      gameTime: -1,
      started: false
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
    const { newWin, gameDetails, sound } = this.props
    if (prevProps.newWin !== newWin) {
      this.setState({
        isWinner: true
      })
      this.refs.tick.pause()
    }

    if (this.state.gameTime > 0) {
      window.setTimeout(() => {
        this.setState({
          gameTime: this.state.gameTime - 1
        })
      }, 1000)
    } else if (this.state.gameTime === 0 && !this.state.started) {
      if (sound) {
        this.refs.playing.play()
      }
      window.setInterval(() => {
        if (gameDetails && !this.state.isWinner && !this.state.isLooser) {
          if (this.state.time === 1) {
            this.setState({
              isLooser: true,
              time: 0,
              started: true
            })
          } else {
            if (this.state.time === 13) {
              this.setState({
                time: this.state.time - 1,
                nearLoose: true,
                started: true
              })
            } else if (this.state.time === 1) {
              this.setState({
                time: this.state.time - 1,
                nearLoose: false,
                started: true
              })
            } else {
              this.setState({
                time: this.state.time - 1,
                started: true
              })
            }
          }
        }
      }, 1000)
    }

    if (gameDetails !== prevProps.gameDetails && gameDetails) {
      if (this.state.gameTime === -1) {
        if (sound) {
          this.refs.gameStart.play()
        }
        this.setState({
          gameTime: 4
        })
      }
    }
  }

  confirmedClose = () => {
    location.reload()
  }

  closeGame = () => {
    const { dispatch } = this.props
    dispatch(alert('Estas seguro que deseas abandonar el juego?', this.confirmedClose, 'ABANDONAR', 'SEGUIR JUGANDO'))
  }

  getHeader = () => {
    const { time } = this.state
    const { gameDetails, sound } = this.props
    let text = ''
    if (gameDetails) {
      text = gameDetails[0].texto
    }
    if (time === 12 && sound) {
      this.refs.playing.volume = 0.4
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
          <div className='closeGame' onClick={this.closeGame}>
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

  retry = (e) => {
    const { dispatch, level, levels } = this.props
    const time = levels[level - 1].time

    $('.correct').css({
      position: 'inherit',
      left: 'auto',
      top: 'auto'
    })

    for (let i = 0; i < $('.correct').length; i++) {
      TweenLite.to($('.correct')[i], 0.3, {
        x: 0,
        y: 0,
        delay: 0.15,
        ease: Back.easeOut
      })
    }

    $('.correct').removeClass('correct')

    for (let i = 0; i < $('.circuitDraggableCard.hidden').length; i++) {
      TweenLite.to($('.circuitDraggableCard.hidden')[i], 0.3, {
        x: 0,
        y: 0,
        delay: 0.15,
        ease: Back.easeOut
      })
    }

    $('.circuitDraggableCard.hidden').removeClass('hidden')

    this.setState({
      isWinner: false,
      time: time,
      isLooser: false,
      nearLoose: false
    })

    dispatch(reTry())
    dispatch(memoTestReset())
    dispatch(agrupandoReset())
  }

  render = () => {
    const { game, sound, levels, level } = this.props
    const { time } = this.state
    let gameUI
    switch (game) {
      case 'memoTest':
        gameUI = <MemoTest />
        break
      case 'circuitos':
        gameUI = <Circuitos />
        break
      case 'agrupando':
        gameUI = <Agrupando />
        break
    }
    let won = null
    let loose = null
    if (this.state.isWinner) {
      if (sound) {
        this.refs.playing.pause()
        this.refs.winGame.play()
      }
      won = (
        <div className='won'>
          <div className='popup'>
            <svg xmlns='http://www.w3.org/2000/svg' width='293' height='377' viewBox='0 0 293 377'>
              <g fill='none' fill-rule='nonzero'>
                <g fill='#B8E986'>
                  <path d={'M78.486 208.585L13.627 344.639l50.222-17.796 17.796 50.242L146.5 241.037zM214.511 208.5' +
                    '85l64.858 136.054-50.208-17.796-17.805 50.242L146.5 241.037z'
                  }/>
                </g>
                <path
                  fill='#FAD97F'
                  d={'M137.389 10.606c5.019 3.339 13.234 3.339 18.248 0l13.255-8.807a10.703 10.703 0 0 1 14.986 3.1' +
                    '91l8.524 13.457c3.227 5.09 10.726 8.43 16.666 7.425l15.695-2.664a10.707 10.707 0 0 1 12.4 9.01' +
                    'l2.321 15.726c.884 5.964 6.374 12.077 12.209 13.583l15.4 3.972c5.836 1.505 9.281 7.489 7.664 1' +
                    '3.295l-4.274 15.289c-1.613 5.807.916 13.622 5.637 17.368l12.505 9.922a10.72 10.72 0 0 1 1.589 ' +
                    '15.251l-10.141 12.259c-3.847 4.646-4.706 12.811-1.915 18.154l7.37 14.098a10.723 10.723 0 0 1-4' +
                    '.735 14.584l-14.254 7.08c-5.391 2.684-9.504 9.797-9.123 15.813l.987 15.877c.373 6.01-4.242 11.' +
                    '147-10.264 11.405l-15.889.667c-6.02.259-12.663 5.09-14.76 10.74l-5.535 14.904a10.714 10.714 0 ' +
                    '0 1-14.007 6.243l-14.802-5.856c-5.603-2.218-13.63-.511-17.847 3.799l-11.125 11.36a10.715 10.71' +
                    '5 0 0 1-15.333.005l-11.139-11.37c-4.217-4.303-12.252-6.011-17.85-3.794l-14.8 5.856a10.707 10.7' +
                    '07 0 0 1-14-6.243l-5.539-14.904c-2.103-5.65-8.743-10.484-14.762-10.74l-15.887-.667a10.731 10.7' +
                    '31 0 0 1-10.26-11.405l.993-15.877c.374-6.014-3.732-13.128-9.128-15.813l-14.253-7.08a10.721 10.' +
                    '721 0 0 1-4.736-14.584l7.373-14.098c2.79-5.343 1.93-13.508-1.912-18.149L2.786 136.62a10.717 10' +
                    '.717 0 0 1 1.596-15.25l12.503-9.92c4.719-3.747 7.256-11.559 5.635-17.364l-4.274-15.3a10.721 10' +
                    '.721 0 0 1 7.659-13.284l15.412-3.98c5.832-1.503 11.325-7.617 12.207-13.58l2.322-15.726a10.71 1' +
                    '0.71 0 0 1 12.4-9.01l15.698 2.664c5.939 1.007 13.435-2.332 16.66-7.425l8.524-13.456c3.22-5.088' +
                    ' 9.97-6.524 14.988-3.192l13.273 8.809z'
                }/>
                <path
                  fill='#F8C963'
                  d={'M252.396 145.651c0 58.505-47.413 105.937-105.893 105.937-58.484 0-105.892-47.43-105.892-105.9' +
                    '37 0-58.499 47.408-105.923 105.892-105.923 58.48 0 105.893 47.424 105.893 105.923z'}
                />
                <path
                  fill='#FFF'
                  d={'M146.503 88.253l18.648 37.792 41.688 6.06-30.165 29.42 7.12 41.54-37.291-19.617-37.288 19.617' +
                    ' 7.124-41.54-30.165-29.42 41.686-6.06z'
                  }
                />
              </g>
            </svg>
            <h3>¡GANASTE!</h3>
            <span className='stadistics'>Resolviste el juego en {levels[level - 1].time - time} segundos</span>
            <button className='exit' onClick={this.confirmedClose}>Salir</button>
            <button className='retry' onClick={this.retry}>Jugar de Nuevo</button>
          </div>
        </div>
      )
    } else if (this.state.isLooser) {
      if (sound) {
        this.refs.playing.pause()
        this.refs.looseGame.play()
      }
      loose = (
        <div className='loose'>
          <div className='popup'>
            <svg xmlns='http://www.w3.org/2000/svg' width='343' height='359' viewBox='0 0 343 359'>
              <g fill='none' fill-rule='evenodd'>
                <path
                  stroke='#424A60'
                  strokeLinecap='round'
                  strokeWidth='2'
                  d='M286.59 82.65l21.397-21.459'/>
                <path
                  fill='#AFB6BB'
                  fill-rule='nonzero'
                  d='M290.825 52.569l25.683-25.683 25.755 25.755-25.683 25.683z'/>
                <path
                  fill='#EA6272'
                  fill-rule='nonzero'
                  d={'M175.313 36.423c-12.154 0-23.968 1.427-35.33 4.043v38.451h-48.42c-3.347 0-6.053 2.714-6.053 6' +
                    '.07 0 3.358 2.706 6.071 6.053 6.071h48.42v30.353H61.3c-3.347 0-6.053 2.714-6.053 6.07 0 3.358 ' +
                    '2.706 6.071 6.053 6.071h78.684v30.353H31.037c-3.348 0-6.053 2.714-6.053 6.07 0 3.358 2.705 6.0' +
                    '71 6.053 6.071h108.947V206.4H6.826c-3.347 0-6.053 2.714-6.053 6.07 0 3.358 2.706 6.071 6.053 6.' +
                    '071h133.158v30.353H43.142c-3.347 0-6.053 2.714-6.053 6.07 0 3.358 2.706 6.071 6.053 6.071h96.84' +
                    '2v30.353H79.458c-3.347 0-6.053 2.714-6.053 6.07 0 3.358 2.706 6.071 6.053 6.071h60.526v44.522c1' +
                    '1.36 2.616 23.175 4.043 35.33 4.043 86.909 0 157.368-70.668 157.368-157.835S262.222 36.423 175' +
                    '.313 36.423z'
                  }
                />
                <path
                  fill='#C13949'
                  fill-rule='nonzero'
                  d={'M259.263 140.667a6.062 6.062 0 0 0-7.826-.631l-78.363 56.85a21.61 21.61 0 0 0-8.813 15.808 21' +
                    '.645 21.645 0 0 0 6.252 16.98c4.074 4.085 9.485 6.337 15.24 6.337 6.889 0 13.414-3.332 17.469-' +
                    '8.923l56.67-78.578a6.076 6.076 0 0 0-.629-7.843z'
                  }
                />
                <path
                  fill='#EFCE4A'
                  fill-rule='nonzero'
                  d={'M253.21 129.26a6.062 6.062 0 0 0-7.826-.63l-78.363 56.85a21.61 21.61 0 0 0-8.813 15.808 21.64' +
                    '5 21.645 0 0 0 6.253 16.98c4.073 4.09 9.484 6.343 15.234 6.343 6.888 0 13.413-3.333 17.468-8.9' +
                    '24l56.67-78.577a6.075 6.075 0 0 0-.622-7.85z'
                  }
                />
                <path
                  fill='#424A60'
                  fill-rule='nonzero'
                  d={'M164.194 36.933c4.001-.303 8.026-.51 12.106-.51s8.104.207 12.105.51V18.212h15.132c5.011 0 9.0' +
                    '79-4.08 9.079-9.106 0-5.027-4.068-9.106-9.08-9.106h-54.473c-5.012 0-9.08 4.08-9.08 9.106s4.068' +
                    ' 9.106 9.08 9.106h15.131v18.721z'
                  }
                />
                <g fill='#EFCE4A' fill-rule='nonzero'>
                  <path
                    d={'M176.3 30.353c-3.347 0-6.053 2.713-6.053 6.07v18.212c0 3.357 2.706 6.07 6.053 6.07s6.052-2.' +
                      '713 6.052-6.07V36.423c0-3.357-2.705-6.07-6.052-6.07zM176.3 327.81c-3.347 0-6.053 2.714-6.053' +
                      ' 6.071v18.212c0 3.357 2.706 6.07 6.053 6.07s6.052-2.713 6.052-6.07V333.88c0-3.357-2.705-6.07' +
                      '-6.052-6.07zM332.682 188.187h-18.158c-3.347 0-6.053 2.714-6.053 6.071 0 3.357 2.706 6.07 6.0' +
                      '53 6.07h18.158c3.347 0 6.052-2.713 6.052-6.07s-2.705-6.07-6.052-6.07zM257.024 52.31a6.038 6.' +
                      '038 0 0 0-8.268 2.222l-9.08 15.777c-1.67 2.908-.677 6.617 2.216 8.293a5.99 5.99 0 0 0 3.02.8' +
                      '13 6.052 6.052 0 0 0 5.248-3.035l9.079-15.778c1.67-2.901.678-6.616-2.215-8.292zM314.62 267.9' +
                      '18l-15.724-9.106a6.03 6.03 0 0 0-8.268 2.222c-1.67 2.908-.678 6.617 2.215 8.293l15.725 9.105' +
                      'a6.04 6.04 0 0 0 8.268-2.222 6.07 6.07 0 0 0-2.215-8.292zM250.16 312.142c-1.677-2.914-5.387-' +
                      '3.91-8.268-2.222a6.072 6.072 0 0 0-2.215 8.293l9.079 15.771a6.047 6.047 0 0 0 8.268 2.222 6.' +
                      '072 6.072 0 0 0 2.215-8.292l-9.079-15.772zM295.882 130.517a5.99 5.99 0 0 0 3.02-.813l15.725-' +
                      '9.106a6.072 6.072 0 0 0 2.215-8.293c-1.67-2.907-5.387-3.909-8.268-2.221l-15.725 9.105a6.07 6' +
                      '.07 0 0 0-2.215 8.293 6.04 6.04 0 0 0 5.248 3.035z'
                    }
                  />
                </g>
              </g>
            </svg>
            <h3>SE HA AGOTADO TU TIEMPO</h3>
            <button className='exit' onClick={this.closeGame}>Salir</button>
            <button className='retry' onClick={this.retry}>Jugar de Nuevo</button>
          </div>
        </div>
      )
    }

    return (
      <div>
        <audio ref='tick' src='http://pasitoapaso.themonstera.com/tick.mp3' preload='auto' />
        <audio ref='gameStart' src='http://pasitoapaso.themonstera.com/start.mp3' preload='auto' />
        <audio ref='winGame' src='http://pasitoapaso.themonstera.com/wingame.mp3' preload='auto' />
        <audio ref='looseGame' src='http://pasitoapaso.themonstera.com/loosegame.mp3' preload='auto' />
        <audio ref='playing' src='http://pasitoapaso.themonstera.com/gameSound.mp3' preload='auto' />
        {this.getHeader()}
        {gameUI}
        {won}
        {loose}
        <span className={
          'gameCounter ' +
          (this.state.gameTime === 0 ? 'hidden' : '')
        }>{this.state.gameTime > 1
          ? this.state.gameTime - 1
          : this.state.gameTime === 1
            ? 'YA!'
            : ''
          }</span>
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
  gameDetails: PropTypes.array,
  sound: PropTypes.bool
}

function mapStateToProps (state) {
  return {
    game: state.Game.game,
    area: state.Area.area,
    level: state.SessionService.level,
    newWin: state.Game.win,
    levels: state.Levels.options,
    gameDetails: state.Game.gameDetails,
    sound: state.Game.sound
  }
}

export default connect(mapStateToProps)(Game)
