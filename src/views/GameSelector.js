import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectGame } from '../actions/Game'

class GameSelector extends React.Component {
  closeGameSelector = () => {
    const { dispatch } = this.props

    dispatch(selectGame(undefined))
  }

  selectGame = (option) => {
    const { dispatch } = this.props

    dispatch(selectGame(option.value))
  }
  /* <div className='cardContainer container'>
            <div classsName='row'>
              <GameCard type='memoTest' level={level} />
              <GameCard type='agrupando' level={level} />
              <GameCard type='circuitos' level={level} />
              <div className='saladejuegos' />
            </div>
          </div>*/

  render = () => {
    // const { level } = this.props
    // Estos juegos vienen de las props pasadas
    // por los que estan disponibles para el Area X
    const options=[
      {
        label: 'Memotest',
        value: 'memotest',
        disabled: false
      },
      {
        label: 'Grupitos',
        value: 'grupitos',
        disabled: false
      },
      {
        label: 'En orden',
        value: 'enorden',
        disabled: false
      }
    ]

    return (
      <div className='overlay'>
        <div className='modalClosable'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            className='closeModal'
            onClick={this.closeGameSelector}
          >
            <g fill='#E6E6E6' fill-rule='evenodd'>
              <path d={'M1.69 22.425a3.248 3.248 0 0 1 0-4.593L17.948 1.574a3.248 3.248 0 0 1 4.593 4.593L6.283 22.' +
                '425a3.248 3.248 0 0 1-4.593 0'} />
              <path d={'M22.472 22.425a3.248 3.248 0 0 1-4.593 0L1.62 6.167a3.248 3.248 0 0 1 4.593-4.593l16.258 16' +
                '.258a3.248 3.248 0 0 1 0 4.593'} />
            </g>
          </svg>
          {options.map((option, index) => {
            return (
              <label
                key={'gameOption-' + index}
                className={'gameOption game' + (index+1) + (option.disabled ? ' disabled' : '')}
                onClick={option.disabled ? null : this.selectGame.bind(this, option)}
              >
                {option.label}
              </label>
            )
          })}
        </div>
      </div>
    )
  }
}

GameSelector.propTypes = {
  dispatch: PropTypes.func,
  level: PropTypes.number
}

function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(GameSelector)

