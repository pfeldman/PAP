import React, {PropTypes} from 'react'
import { connect } from 'react-redux'

class MemoTest extends React.Component {
  render = () => {
    const { loggedIn } = this.props
    console.log(loggedIn)
    return <div>MEMOTEST</div>
  }
}

MemoTest.propTypes = {
  loggedIn: PropTypes.bool
}

function mapStateToProps (state) {
  return {
    loggedIn: state.SessionService.loggedIn
  }
}

export default connect(mapStateToProps)(MemoTest)
