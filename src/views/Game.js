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
    dispatch(
      alert('¿Estás seguro que deseas abandonar el juego?', this.confirmedClose, 'DEJAR DE JUGAR', 'SEGUIR JUGANDO')
    )
  }

  getHeader = () => {
    const { time } = this.state
    const { gameDetails, sound } = this.props
    let text = ''
    let bold = ''
    let description = 'description'
    if (gameDetails) {
      text = $('<textarea />').html(gameDetails[0].texto).text()
      const words = text.split(' ')
      bold = words[0]
      text = words.slice(1, words.length).join(' ')
      description = $('<textarea />').html(gameDetails[0].description).text()
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
          <label className='gameObjective'>
            <b>{bold + ' '}</b>{text}<br />
            <label>{description}</label>
          </label>
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
            <svg xmlns='http://www.w3.org/2000/svg' width='313' height='372' viewBox='0 0 313 372'>
              <g fill='none' fill-rule='nonzero'>
                <path
                  fill='#FFF'
                  d={'M289.071 44.622h-.037c-12.966 0-23.525 10.551-23.545 23.538l-.054 34.25L169.65 6.505c-8.663-8' +
                    '.674-22.758-8.674-31.42 0a22.115 22.115 0 0 0-5.897 10.59l-1.709-1.711a22.06 22.06 0 0 0-15.71' +
                    '-6.515c-5.935 0-11.513 2.314-15.71 6.516-8.662 8.673-8.662 22.786 0 31.46l5.288 5.294a22.061 2' +
                    '2.061 0 0 0-10.56 5.913 22.112 22.112 0 0 0-6.508 15.73 22.114 22.114 0 0 0 6.507 15.73l10.883' +
                    ' 10.897a22.094 22.094 0 0 0-10.588 5.903 22.117 22.117 0 0 0-6.506 15.73 22.117 22.117 0 0 0 6' +
                    '.506 15.73l7.23 7.239a22.272 22.272 0 0 0-.516 4.751v15.403a22.058 22.058 0 0 0-11.648-3.313c-' +
                    '12.25 0-22.217 9.979-22.217 22.245v115.497c0 25.432 8.81 50.317 24.807 70.071a5.27 5.27 0 0 0 ' +
                    '4.108 1.959 5.26 5.26 0 0 0 3.325-1.181 5.296 5.296 0 0 0 .777-7.443c-14.476-17.874-22.447-40.' +
                    '393-22.447-63.407V184.097c0-6.43 5.225-11.663 11.648-11.663 6.422 0 11.648 5.231 11.648 11.663' +
                    'V258.3a5.288 5.288 0 0 0 5.285 5.29 5.288 5.288 0 0 0 5.284-5.29V149.763c0-6.43 5.226-11.663 1' +
                    '1.649-11.663 6.422 0 11.648 5.232 11.648 11.663v101.441a5.288 5.288 0 0 0 5.284 5.291 5.288 5.' +
                    '288 0 0 0 5.285-5.29v-127.88c0-6.43 5.226-11.662 11.648-11.662 6.423 0 11.648 5.232 11.648 11.' +
                    '663v133.398a5.288 5.288 0 0 0 5.284 5.291 5.288 5.288 0 0 0 5.285-5.291V144.677c0-6.43 5.226-1' +
                    '1.663 11.648-11.663 6.423 0 11.649 5.232 11.649 11.663 0 0 .011 148.772.034 148.971a5.273 5.27' +
                    '3 0 0 0 1.508 3.139 5.28 5.28 0 0 0 7.473.012l33.241-33.178c5.067-5.058 13.3-5.044 18.352.03 5' +
                    '.049 5.07 5.038 13.31-.023 18.368l-79.308 79.258a5.295 5.295 0 0 0-.008 7.482 5.265 5.265 0 0 ' +
                    '0 3.741 1.554c1.35 0 2.702-.516 3.733-1.546l79.309-79.258c9.183-9.177 9.202-24.129.042-33.33-9' +
                    '.166-9.207-24.103-9.23-33.298-.053l-24.227 24.18v-36.245a110.746 110.746 0 0 0 23.688 6.564 5.' +
                    '288 5.288 0 0 0 6.054-4.387 5.29 5.29 0 0 0-4.38-6.061 100.074 100.074 0 0 1-25.362-7.62v-87.8' +
                    '8c0-12.266-9.967-22.245-22.217-22.245-.406 0-.81.013-1.212.034l-83.002-83.102c-4.542-4.548-4.5' +
                    '42-11.948 0-16.495a11.567 11.567 0 0 1 8.237-3.417c3.112 0 6.038 1.213 8.237 3.416l94.21 94.32' +
                    '7a5.28 5.28 0 0 0 7.473 0 5.295 5.295 0 0 0 0-7.483l-79.13-79.23a11.593 11.593 0 0 1-3.412-8.2' +
                    '47c0-3.115 1.212-6.044 3.412-8.246 4.543-4.548 11.931-4.548 16.474 0l99.864 99.988c-14.23 6.94' +
                    '9-25.459 18.565-31.945 33.228-7.284 16.463-7.728 34.78-1.25 51.576a5.272 5.272 0 0 0 6.832 3.0' +
                    '3 5.293 5.293 0 0 0 3.026-6.84c-5.46-14.161-5.085-29.603 1.055-43.482 6.14-13.878 17.229-24.74' +
                    '7 31.453-29.998 4.893-1.806 4.77-5.165 4.772-6.32l.075-46.995a12.917 12.917 0 0 1 3.814-9.181 ' +
                    '12.885 12.885 0 0 1 9.162-3.79h.02c7.151.01 12.963 5.845 12.957 13.004l-.106 112.194a5.288 5.2' +
                    '88 0 0 0 5.28 5.296h.004a5.288 5.288 0 0 0 5.285-5.286l.105-112.194c.012-12.99-10.533-23.576-2' +
                    '3.509-23.597zM123.157 127.52c-6.636 0-12.596 2.93-16.671 7.564l-4.787-4.793a11.596 11.596 0 0 ' +
                    '1-3.41-8.247c0-3.116 1.21-6.045 3.408-8.245 4.547-4.546 11.94-4.547 16.478-.003.013.013.03.022' +
                    '.042.035l16.59 16.61v.392a22.056 22.056 0 0 0-11.65-3.313zm12.71-10.982L101.405 82.03a11.593 1' +
                    '1.593 0 0 1-3.412-8.247c0-3.115 1.21-6.045 3.412-8.248a11.563 11.563 0 0 1 8.237-3.415c3.055 0' +
                    ' 5.934 1.171 8.11 3.297l35.877 35.923c-8.377 1.291-15.224 7.286-17.762 15.197z'
                  }
                />
                <path
                  fill='#B8E986'
                  d={'M51.026 125.05a5.291 5.291 0 0 0 .956-10.494l-45.689-8.472a5.284 5.284 0 0 0-6.158 4.24 5.291' +
                    ' 5.291 0 0 0 4.234 6.166l45.688 8.471c.325.06.649.089.969.089zM72.06 95.028a5.296 5.296 0 0 0 ' +
                    '1.36-7.358L47.096 49.333a5.282 5.282 0 0 0-7.35-1.363 5.296 5.296 0 0 0-1.36 7.358l26.325 38.3' +
                    '37a5.278 5.278 0 0 0 7.348 1.363zM55.81 148.745l-38.29 26.357a5.296 5.296 0 0 0-1.361 7.358 5.' +
                    '278 5.278 0 0 0 7.349 1.363l38.289-26.358a5.296 5.296 0 0 0 1.36-7.358 5.281 5.281 0 0 0-7.348' +
                    '-1.362z'
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
            <h3>EL TIEMPO SE TERMINÓ</h3>
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
  sound: PropTypes.bool,
  allGameDetails: PropTypes.object
}

function mapStateToProps (state) {
  return {
    game: state.Game.game,
    area: state.Area.area,
    level: state.SessionService.level,
    newWin: state.Game.win,
    levels: state.Levels.options,
    gameDetails: state.Game.gameDetails,
    sound: state.Game.sound,
    allGameDetails: state.SessionService.allGameDetails
  }
}

export default connect(mapStateToProps)(Game)
