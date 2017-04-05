import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import Login from './Login'

class App extends React.Component {
  render = () => {
    const { loggedIn } = this.props

    if (loggedIn) {
      return <div>DASHBOARD</div>
    } else {
      return <Login />
    }
  }
}

App.propTypes = {
  loggedIn: PropTypes.bool
}

function mapStateToProps (state) {
  return {
    loggedIn: state.SessionService.loggedIn
  }
}

export default connect(mapStateToProps)(App)
