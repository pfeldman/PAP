import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import Modal from '../components/Modal'
import { modal } from '../actions/Modal'
import Dropdown from 'react-dropdown'

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
          />
        </div>
      )))
    }
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
  levels: PropTypes.array
}

function mapStateToProps (state) {
  return {
    name: state.SessionService.name,
    level: state.SessionService.level,
    levels: state.Levels.options
  }
}

export default connect(mapStateToProps)(Dashboard)
