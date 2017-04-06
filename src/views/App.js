import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import Dashboard from './Dashboard'
import { getLevels } from '../actions/Levels'

class App extends React.Component {
  componentDidMount = () => {
    const { dispatch } = this.props;

    dispatch(getLevels())
  }

  render = () => {
    const { loggedIn } = this.props

    if (loggedIn) {
      return <Dashboard />
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
