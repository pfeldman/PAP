import React, {PropTypes} from 'react'

class ColorShower extends React.Component {
  render = () => {
    const { color, className } = this.props
    return (
      <div
        className={'colorShower ' + className}
        style={{
          backgroundColor: (color
            ? color.indexOf(',') >= 0
              ? 'rgb(' + color + ')'
              : color
            : 'transparent'
          )
        }}
      >
      </div>
    )
  }
}

ColorShower.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string
}

export default ColorShower
