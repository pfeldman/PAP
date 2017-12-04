import React from 'react'
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

function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(App)
