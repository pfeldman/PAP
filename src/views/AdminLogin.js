import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { adminLogin } from '../actions/SessionService'

class Login extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loginVisible: false
    }
  }

  get error () {
    const { adminLoggedInError } = this.props

    if (adminLoggedInError) {
      return (
        <label className='error'>
          El usuario o la contraseña son incorrectos. <br />Por favor intente una vez mas
        </label>
      )
    }
    return null
  }

  showModal = (event, value = true) => {
    if (value || (!value && event.target === this.refs.overlay)) {
      this.setState({
        loginVisible: value
      })
    }

    return false
  }

  get loginWidow () {
    if (this.state.loginVisible) {
      return (
        <div className='overlay' ref='overlay' onClick={(e) => this.showModal(e, false)}>
          <form onSubmit={this.login} autoComplete='new-password'>
            <h2>Iniciar Sesión</h2>
            <div className='form-group'>
              <label>Usuario:</label>
              <input autoComplete='new-password' ref='username' />
            </div>
            <div className='form-group'>
              <label>Contraseña:</label>
              <input autoComplete='new-password' type='password' ref='password' />
            </div>
            {this.error}
            <input type='submit' value='Ingresar' />
          </form>
        </div>
      )
    }
    return null
  }

  render = () => {
    return (
        <div className='loginView'>
          {this.loginWidow}
          <button className='enableLogin' onClick={(e) => this.showModal(e, true)}>INGRESAR</button>
        </div>
    )
  }

  login = (e) => {
    e.preventDefault()
    this.props.dispatch(adminLogin(this.refs.username.value, this.refs.password.value))
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  adminLoggedInError: PropTypes.bool
}

function mapStateToProps (state) {
  return {
    adminLoggedInError: state.SessionService.adminLoggedInError
  }
}

export default connect(mapStateToProps)(Login)
