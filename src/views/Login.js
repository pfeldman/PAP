import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/SessionService'

class Login extends React.Component {
  render = () => {
    return (
        <div>
          <form onSubmit={this.login}>
            <input placeholder='Username' ref='username' />
            <input placeholder='Password' type='password' ref='password' />
            <input type='submit' value='Login' />
          </form>
        </div>
    )
  }

  login = (e) => {
    e.preventDefault()
    this.props.dispatch(login())
  }
}

Login.propTypes = {
  dispatch: PropTypes.func
}

export default connect()(Login)
