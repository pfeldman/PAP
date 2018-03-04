import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import '../assets/main.scss'

class Root extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired,
    store: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  };

  componentDidMount = () => {
    window.setTimeout(() => {
      this.setState({
        loaded: true
      })
    }, 1000)
  };

  get content () {
    return (
      <Router history={this.props.history}>
        {this.props.routes}
      </Router>
    )
  }

  render () {
    return (
      <div>
        <Provider store={this.props.store}>
          <div>
            <div>
              {this.content}
            </div>
          </div>
        </Provider>
      </div>
    )
  }
}

export default Root
