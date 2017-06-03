import React, {PropTypes} from 'react'

class AccordeonPage extends React.Component {
  render = () => {
    const { title, content, open, onClick } = this.props

    return (
      <div className='accordeonPage'>
        <div
          className={'accordeonTitle ' + (open ? 'open' : '')}
          onClick={onClick}
        >
          {title}
        </div>
        <div className={'accordeonContent ' + (open ? 'open' : '')}>
          {content}
        </div>
      </div>
    )
  }
}

AccordeonPage.propTypes = {
  title: PropTypes.string,
  content: PropTypes.object,
  open: PropTypes.bool,
  onClick: PropTypes.func
}

export default AccordeonPage
