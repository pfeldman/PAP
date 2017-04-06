import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/SessionService'

class Login extends React.Component {
  get error () {
    const { loggedInError } = this.props

    if (loggedInError) {
      return <label>ERROR</label>
    }
    return null
  }
  render = () => {
    return (
        <div>
          <form onSubmit={this.login}>
            <input placeholder='Username' ref='username' />
            <input placeholder='Password' type='password' ref='password' />
            <input type='submit' value='Login' />
          </form>
          {this.error}
        </div>
    )
  }

  login = (e) => {
    e.preventDefault()
    this.props.dispatch(login(this.refs.username.value, this.refs.password.value))
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  loggedInError: PropTypes.bool
}

function mapStateToProps (state) {
  return {
    loggedInError: state.SessionService.loggedInError
  }
}

export default connect(mapStateToProps)(Login)
