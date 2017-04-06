import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { modal } from '../actions/Modal'

class Modal extends React.Component {
  close = (force) => {
    const { mandatory, dispatch } = this.props
    if (!mandatory || (mandatory && force)) {
      dispatch(modal())
    }
  }

  render = () => {
    const { visible, content } = this.props

    if (visible) {
      return (
        <div className='overlay' onClick={this.close.bind(this, false)}>
          <div className='popup'>
            {content}
          </div>
        </div>
      )
    }
    return null
  }
}

Modal.propTypes = {
  dispatch: PropTypes.func,
  visible: PropTypes.bool,
  content: PropTypes.object,
  mandatory: PropTypes.bool
}

function mapStateToProps (state) {
  return {
    visible: state.Modal.visible,
    content: state.Modal.content
  }
}

export default connect(mapStateToProps)(Modal)
