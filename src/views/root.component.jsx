import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router';
import '../assets/main.scss';

class Root extends React.Component {
  render () {
    return (
      <Router history={this.props.history}>
        {this.props.routes}
      </Router>
    );
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  routes: PropTypes.element.isRequired
};

export default Root;
