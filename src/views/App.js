import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import { getLevels } from '../actions/Levels'

class App extends React.Component {
  componentDidMount = () => {
    const { dispatch } = this.props

    dispatch(getLevels())
  }

  render = () => <Dashboard />
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
