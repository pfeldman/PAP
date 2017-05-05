import React, { PropTypes } from 'react'

class LevelSelector extends React.Component {
  render = () => {
    const { options, onChange } = this.props
    return (
      <div className='levelSelectorC'>
        {options.map((option, index) => {
          return (
            <label
              key={'levelOption-' + index}
              className={'levelOption ' + (option.disabled ? 'disabled' : '')}
              onClick={!option.disabled ? onChange.bind(this, option) : null}
            >
              {option.label}
            </label>
          )
        })}
      </div>
    )
  }
}

LevelSelector.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func
}

export default LevelSelector
