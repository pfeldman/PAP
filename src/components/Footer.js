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
          <div className='pull-left'>
            <label className='level'>
              DIFICULTAD
            </label>
            <Dropdown
              options={levels}
              onChange={this.onSelect}
              value={levels[level - 1]}
            />
          </div>
          <div className='pull-right'>
            <div className='endSession' onClick={this.logout}>
              <label>
                SALIR
              </label>
              <img src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA4CAYAAABZjWCTAAAACXBIWXMAAAsSAAALEgHS3' +
                'X78AAAEK0lEQVRo3t2aX07rRhSHv4wdEwnpJoQrpKsSNQ/N86UrKF1Bs4Oyg7KEdAfpDrg7oDswK2h49kMp4aoSEiEgoUJiO33I' +
                'mJv42uN/Y+P2SJGikBny+Xdmzpkzp7FarSjTZr1BH+iHPp53p86Ekq2hE27WGxwBx/J1BHybMOQBmAA2YHenjl0rOKnMKTBMAUM' +
                'K2HNgrEPZ3HCz3uAYGAE/lORVF8CoiJqZ4aRSY+AnqrEL4DSPkiIj2KlcI1WBIT3jj1lvMCpFuVlv0AHOKoaKskvguDt15lrgJJ' +
                'gNfKQe9iABJ4XcUq6vOoEBtAFbhp18ytVQscwKRsIlgT0ZgrumyaNhANBcrdhzPQ4Wy0K/9tEwuLVMnsXaoVq+z8HC5Z3nqQD7c' +
                'Wswzi3HcWD3psGfrZ1XMIBlo8Ft0+Rmx8oNdrNjcd2yXsEAnoXgumWp5m1LEdKtuVlvMAR+jgP7rACYm0YuwJsdi7lp5J33Y1yY' +
                '2HJL6Y5X8olkAtu0jutx+LLQApZh3u/D609EuGM7ao19zqBIWgWzgAXz3sd/fxzrlnLbj3THu6aZ2dWSALOCBXZrNWMzGbmkIpW' +
                'LTW/+ESLXJhEHmBcs2LwUdvoVnEo1AL/A9h4GLAKWJg+Vp5Ut5YaqEbu+X+g/BoA6wJrJufBJ8MYMfxBl+0t3K67lBdRh75du0l' +
                'dehRLSJZUp1q7ns588aenWcb00v6MdbCxC1jsS7cNiScf13hQsbeyU9Zv0cACHL4s3AcwIRsAk+LrsVivAHGBbyh1lHVkVYE6wI' +
                'KGmcXf4Xe7aXpkxqwBYYD+KIqPLUlADWPbqVxWAusC0wNXZCsPpXnd5D7za4craUHQBCllkqdVOqQOwO3Vswbo8XiswDYAPgXKT' +
                'OoIVBJxkhqsarACgHcDZdQbLCWiDLO3NeoOJ6kz3aBhctyzqYAdLN6my/dCdOp3NUHCmfGrN4op1XE9LJnOf7D3n4TinhHsSojD' +
                'Y4ctCS6qWUP2CjfqlkDFhDnwqI9KHc8WSj0sXm1XnVHXLXc/XAqYDsKWuxI0iRelOnSvgt6gR73MUh5Ky+7yABwtXpZqt8rhRVD' +
                'rW8n2+yXAMSXtsyQrYcT3VXd2JcjnJtXcSNXLP9VIBZj2PpQVMmPdX6XlbFnezOgZ+iduK4258ihw0/7aasRcu+0uXD/Gx7aI7d' +
                'Y6j/qC6E48N7M9CcGuZPAmB12iw6/l0XJe9grtg+Dr6nbcuwio2NGXrxv/6wl8ozkNz1sXNy/8iWGJ8ringJSmbbFI3ts16gzMU' +
                'd3gV2e/Aibb2qBDgUOah7Tdww1F36oxLKxB1p84567uFTxWrdZQVLLNyIRX7MqMpy1WrbyaNgRzKzKZo2PiLL23AV0Wfju4G7j5' +
                'fGrj7JLcIX7Ju6rFZN3Br7VhvlN16vwHdDw72VbTdA/wL0Ss1t7cmQgQAAAAASUVORK5CYII='} />
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
