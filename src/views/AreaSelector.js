import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import LevelSelector from '../components/LevelSelector'
import { selectGame } from '../actions/Game'
import { selectArea } from '../actions/Area'

class AreaSelector extends React.Component {
  closeAreaSelector = () => {
    const { dispatch } = this.props

    dispatch(selectGame(undefined))
  }

  selectArea = (option) => {
    const { dispatch } = this.props

    dispatch(selectArea(option.value))
  }

  render = () => {
    const { areas } = this.props
    return (
      <div className='overlay'>
        <div className='modalClosable'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            className='closeModal'
            onClick={this.closeAreaSelector}
          >
            <g fill='#E6E6E6' fill-rule='evenodd'>
              <path d={'M1.69 22.425a3.248 3.248 0 0 1 0-4.593L17.948 1.574a3.248 3.248 0 0 1 4.593 4.593L6.283 22.' +
                '425a3.248 3.248 0 0 1-4.593 0'} />
              <path d={'M22.472 22.425a3.248 3.248 0 0 1-4.593 0L1.62 6.167a3.248 3.248 0 0 1 4.593-4.593l16.258 16' +
                '.258a3.248 3.248 0 0 1 0 4.593'} />
            </g>
          </svg>

          <label className='details'>Elegí en que área querés juegar</label>
          <LevelSelector
            options={[
              {
                label: 'Lengua',
                value: 'lengua',
                disabled: !(areas.indexOf('lengua') >= 0)
              },
              {
                label: 'Matemática',
                value: 'matematica',
                disabled: !(areas.indexOf('matematica') >= 0)
              },
              {
                label: 'Naturales',
                value: 'naturales',
                disabled: !(areas.indexOf('naturales') >= 0)
              },
              {
                label: 'Sociales',
                'value': 'sociales',
                disabled: !(areas.indexOf('sociales') >= 0)
              }
            ]}
            onChange={this.selectArea}
          />
        </div>
      </div>
    )
  }
}

AreaSelector.propTypes = {
  dispatch: PropTypes.func,
  areas: PropTypes.array
}

function mapStateToProps (state) {
  return {
    areas: state.SessionService.areas
  }
}

export default connect(mapStateToProps)(AreaSelector)
