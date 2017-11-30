import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectGame } from '../actions/Game'
import { selectArea } from '../actions/Area'

class AreaSelector extends React.Component {
  closeAreaSelector = () => {
    const { dispatch } = this.props

    dispatch(selectGame(undefined))
  }

  selectArea = (option) => {
    const { dispatch } = this.props
    console.log('area selecionada', option)

    dispatch(selectArea(option.value))
  }

  render = () => {
    /* const data = availableAreas[game][level]
    if (!data) {
      allDisabled = true
    }*/
    const options= [
      {
        label: 'Prácticas de lenguaje',
        value: 'lengua'
      },
      {
        label: 'Matemática',
        value: 'matematica'
      },
      {
        label: 'Ciencias Naturales',
        value: 'naturales'
      },
      {
        label: 'Ciencias Sociales',
        value: 'sociales'
      }
    ]

    return (
      <div className='areaSelector'>
          <label className='details'>Elegí en qué área querés jugar</label>
          {options.map((option, index) => {
            return (
              <label
                key={'areaOption-' + index}
                className={`areaOption ${option.value}`}
                onClick={() => this.selectArea(option)}
              >
                {option.label}
              </label>
            )
          })}
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
