import React, {PropTypes} from 'react'
import AccordeonPage from './AccordeonPage'

class Accordeon extends React.Component {
  render = () => {
    const { pages } = this.props

    return (
      <div className='accordeon'>
        {pages.map((page, index) => {
          return (
            <AccordeonPage
              title={page.title}
              content={page.content}
              key={'accordeonPage-' + index}
              open={page.open}
              onClick={page.onClick}
            />
          )
        })}
      </div>
    )
  }
}

Accordeon.propTypes = {
  pages: PropTypes.array
}

export default Accordeon
