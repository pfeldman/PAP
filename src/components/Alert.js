import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { closeAlert } from '../actions/Alert'

class Alert extends React.Component {
  closeAlert = () => {
    const { dispatch } = this.props
    dispatch(closeAlert())
  }

  action = () => {
    const { action } = this.props
    action()
  }

  render = () => {
    const { timestamp, message, closeText, okText } = this.props
    if (timestamp) {
      return (
        <div className='overlay'>
          <audio ref='click' src='http://pasitoapaso.themonstera.com/click.mp3' preload='auto' />
          <div className='alert'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              className='closeAlert'
              onClick={this.closeAlert}
            >
              <g fill='#E6E6E6'>
                <path
                  d={'M1.69 22.425a3.248 3.248 0 0 1 0-4.593L17.948 1.574a3.248 3.248 0 0 1 4.593 4.593L6.283 22.42' +
                    '5a3.248 3.248 0 0 1-4.593 0'
                  }
                />
                <path
                  d={'M22.472 22.425a3.248 3.248 0 0 1-4.593 0L1.62 6.167a3.248 3.248 0 0 1 4.593-4.593l16.258 16.2' +
                    '58a3.248 3.248 0 0 1 0 4.593'
                  }
                />
              </g>
            </svg>
            {message}
            <div className='buttons'>
              <button className='close' onClick={this.closeAlert}>{closeText}</button>
              <button className='okButton' onClick={this.action}>{okText}</button>
            </div>
          </div>
        </div>
      )
    }
    return null
  }
}

Alert.propTypes = {
  dispatch: PropTypes.func,
  message: PropTypes.string,
  timestamp: PropTypes.number,
  action: PropTypes.func,
  closeText: PropTypes.string,
  okText: PropTypes.string,
  sound: PropTypes.bool
}

function mapStateToProps (state) {
  return {
    message: state.Alert.message,
    timestamp: state.Alert.new,
    closeText: state.Alert.buttonCloseText,
    okText: state.Alert.buttonOKText,
    action: state.Alert.action,
    sound: state.Game.sound
  }
}

export default connect(mapStateToProps)(Alert)
