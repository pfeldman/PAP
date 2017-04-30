import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Dropdown from 'react-dropdown'
import { updateLevel, logout } from '../actions/SessionService'

class Footer extends React.Component {
  render = () => {
    const { levels, level } = this.props
    if (levels) {
      return (
        <div className='footer'>
          <div className='pull-left levelSelectorFooter'>
            <label className='level'>
              Dificultad
            </label>
            <Dropdown
              options={levels}
              onChange={this.onSelect}
              value={levels[level - 1]}
            />
          </div>
          <div className='pull-right logoutFooter'>
            <div className='endSession' onClick={this.logout}>
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
    return null
  }

  updateLevel = (username, level) => {
    const { dispatch } = this.props

    dispatch(updateLevel(username, level))
  }

  logout = () => {
    const { dispatch } = this.props

    dispatch(logout())
  }

  onSelect = (param) => {
    const { value } = param
    const { username } = this.props
    this.updateLevel(username, value)
  }
}

Footer.propTypes = {
  dispatch: PropTypes.func,
  levels: PropTypes.array,
  username: PropTypes.string,
  level: PropTypes.number
}

function mapStateToProps (state) {
  return {
    levels: state.Levels.options,
    username: state.SessionService.username,
    level: state.SessionService.level
  }
}

export default connect(mapStateToProps)(Footer)
