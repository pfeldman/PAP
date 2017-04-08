import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import Modal from '../components/Modal'
import { modal } from '../actions/Modal'
import Dropdown from 'react-dropdown'
import { updateLevel } from '../actions/SessionService'

class Dashboard extends React.Component {
  componentDidUpdate = (prevProps) => {
    const { level, dispatch, name, levels } = this.props
    if (!level && levels && prevProps.levels !== levels) {
      dispatch(modal(true, (
        <div className='levelSelector'>
          <b>Bienvenido/a {name}!</b><br />
          Parece que es la primera vez que nos vemos! Elegí tu grado para empezar:
          <Dropdown
            options={levels}
            onChange={this.onSelect}
          />
        </div>
      )))
    }
  }

  updateLevel = (username, level) => {
    const { dispatch } = this.props

    dispatch(updateLevel(username, level))
  }

  onSelect = (param) => {
    const { value } = param
    const { username } = this.props
    this.updateLevel(username, value)
  }

  render = () => {
    return (
      <div>
        <div>DASHBOARD</div>
        <Modal mandatory />
      </div>
    )
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func,
  name: PropTypes.string,
  level: PropTypes.number,
  levels: PropTypes.array,
  username: PropTypes.string
}

function mapStateToProps (state) {
  return {
    name: state.SessionService.name,
    level: state.SessionService.level,
    levels: state.Levels.options,
    username: state.SessionService.username
  }
}

export default connect(mapStateToProps)(Dashboard)
