import React, {PropTypes} from 'react'

class ImagePreview extends React.Component {
  render = () => {
    const { image, className, onNewPic } = this.props
    return (
      <div className='pr pull-left'>
        <input
          type='file'
          onChange={onNewPic}
          className='fileStyled'
        />
        <img
          className={'imagePreview ' + className}
          src={image}
        >
        </img>
      </div>
    )
  }
}

ImagePreview.propTypes = {
  image: PropTypes.string,
  className: PropTypes.string,
  onNewPic: PropTypes.func
}

export default ImagePreview
