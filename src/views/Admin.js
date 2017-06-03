import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

class Admin extends React.Component {
  render = () => {
    const { adminLoggedIn } = this.props

    if (adminLoggedIn) {
      return <AdminDashboard />
    } else {
      return <AdminLogin />
    }
  }
}

Admin.propTypes = {
  adminLoggedIn: PropTypes.bool
}

function mapStateToProps (state) {
  return {
    adminLoggedIn: state.SessionService.adminLoggedIn
  }
}

export default connect(mapStateToProps)(Admin)
