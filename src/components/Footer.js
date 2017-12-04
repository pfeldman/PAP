import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { setSound } from '../actions/Game'

class Footer extends React.Component {
  getSoundStatus = () => {
    const { sound } = this.props
    if (sound) {
      return (
        <svg xmlns='http://www.w3.org/2000/svg' width='58' height='58' viewBox='0 0 58 58'>
            <g fill='none' fill-rule='nonzero'>
                <circle cx='29' cy='29' r='29' className='soundBG' />
                <path
                  className='audioIcon'
                  d={'M22.427 20h-8.323A2.104 2.104 0 0 0 12 22.104v12.793c0 1.161.942 2.103 2.104 2.103h8.323c.375' +
                    ' 0 .743.1 1.067.29L36.83 49.706c1.402.825 3.17-.186 3.17-1.813V9.107c0-1.627-1.768-2.638-3.17-1.' +
                    '813L23.494 19.71c-.324.19-.692.29-1.067.29z'
                  }
                />
            </g>
        </svg>
      )
    } else {
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='58'
          height='58'
          viewBox='0 0 58 58'
        >
          <g fill='none' fill-rule='nonzero'>
            <g>
              <circle cx='29' cy='29' r='29' className='soundBG' />
              <path
                className='audioIcon'
                d={'M22.427 20h-8.323A2.104 2.104 0 0 0 12 22.104v12.793c0 1.161.942 2.103 2.104 2.103h8.323c.375 0 ' +
                  '.743.1 1.067.29L36.83 49.706c1.402.825 3.17-.186 3.17-1.813V9.107c0-1.627-1.768-2.638-3.17-1.813L' +
                  '23.494 19.71c-.324.19-.692.29-1.067.29z'}
              />
            </g>
            <path
              fill='#000'
              d={'M50.866 9.962c-.436-.5-.884-.992-1.36-1.468a29.247 29.247 0 0 0-1.468-1.36L7.134 48.038c.436.5.88' +
                '4.992 1.36 1.468.476.476.968.924 1.468 1.36L50.866 9.962z'
              }
            />
          </g>
        </svg>
      )
    }
  }

  toggleSound = () => {
    const { dispatch, sound } = this.props

    dispatch(setSound(!sound))
  }

  render = () => {
    const { level } = this.props

    return (
      <div className='footer'>
        <div className='pull-left levelSelectorFooter'>
          <div className={`level${level} saladejuegos`} />
        </div>
        <div className='pull-right logoutFooter'>
          <div className='toogleSound' onClick={this.toggleSound}>
            {this.getSoundStatus()}
          </div>
          <div className='endSession pull-left' onClick={this.logout}>
            <label>
              SALIR
            </label>
            <svg xmlns='http://www.w3.org/2000/svg' width='55' height='55' viewBox='0 0 55 55'>
              <g fill='none' fill-rule='evenodd'>
                <path
                  className='crossBG'
                  d={'M54.157 27.079c0 14.955-12.124 27.079-27.079 27.079S0 42.034 0 27.079 12.123 0 27.078 0s27.' +
                    '079 12.124 27.079 27.079'
                  }/>
                <path
                  className='crossInnter'
                  d={'M26.603 33.862l6.219 6.219c1.5 1.5 3.932 1.5 5.432 0l1.827-1.827a3.84 3.84 0 0 0 0-5.432l-6' +
                    '.219-6.219 6.22-6.219c1.499-1.5 1.499-3.931 0-5.431l-1.829-1.828a3.84 3.84 0 0 0-5.431 0l-6.' +
                    '219 6.219-6.219-6.22a3.841 3.841 0 0 0-5.431 0l-1.828 1.829a3.84 3.84 0 0 0 0 5.431l6.219 6.' +
                    '22-6.219 6.218a3.841 3.841 0 0 0 0 5.432l1.828 1.827a3.84 3.84 0 0 0 5.431 0l6.22-6.219z'
                  }
                />
              </g>
            </svg>

          </div>
        </div>
      </div>
    )
  }
}

Footer.propTypes = {
  dispatch: PropTypes.func,
  levels: PropTypes.array,
  username: PropTypes.string,
  level: PropTypes.number,
  sound: PropTypes.bool
}

function mapStateToProps (state) {
  return {
    levels: state.Levels.options,
    username: state.SessionService.username,
    level: state.SessionService.level,
    sound: state.Game.sound
  }
}

export default connect(mapStateToProps)(Footer)
