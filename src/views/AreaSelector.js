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
    const { availableAreas, game, level } = this.props
    let allDisabled = false
    const data = availableAreas[game][level]
    if (!data) {
      allDisabled = true
    }
    
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
                label: 'Prácticas de lenguaje',
                value: 'lengua',
                disabled: allDisabled || data.indexOf('lengua') === -1
              },
              {
                label: 'Matemática',
                value: 'matematica',
                disabled: allDisabled || data.indexOf('matematica') === -1
              },
              {
                label: 'Ciencias Naturales',
                value: 'naturales',
                disabled: allDisabled || data.indexOf('naturales') === -1
              },
              {
                label: 'Ciencias Sociales',
                'value': 'sociales',
                disabled: allDisabled || data.indexOf('sociales') === -1
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
  areas: PropTypes.array,
  availableAreas: PropTypes.object,
  level: PropTypes.number,
  game: PropTypes.string
}

function mapStateToProps (state) {
  return {
    areas: state.SessionService.areas,
    availableAreas: state.SessionService.availableAreas,
    level: state.SessionService.level,
    game: state.Game.game
  }
}

export default connect(mapStateToProps)(AreaSelector)
