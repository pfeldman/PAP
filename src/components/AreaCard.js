import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectArea } from '../actions/Area'

class AreaCard extends React.Component {
  selectArea = () => {
    const { type, dispatch } = this.props

    dispatch(selectArea(type))
  }

  render = () => {
    const { type } = this.props

    return (
      <div className={'areaCard ' + type} onClick={this.selectArea}>
        
      </div>
    )
  }
}

AreaCard.propTypes = {
  dispatch: PropTypes.func,
  type: PropTypes.string
}

export default connect()(AreaCard)
