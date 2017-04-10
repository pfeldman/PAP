import React from 'react'
import AreaCard from '../components/AreaCard'

class AreaSelector extends React.Component {
  render = () => {
    return (
      <div className='cardContainer'>
        <h1>¿En que área quierés jugar hoy?</h1>
        <div className='spacer' />
        <AreaCard type='lengua' />
        <AreaCard type='sociales' />
        <AreaCard type='naturales' />
      </div>
    )
  }
}

export default AreaSelector
