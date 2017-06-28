import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import { resetCard, correct } from '../actions/Agrupando'

class AgrupandoCard extends React.Component {
  componentDidUpdate = (prevProps) => {
    const {
      droppedCard, changed, dropedCategory, title, dispatch, ok, fail
    } = this.props

    if (prevProps.changed !== changed) {
      const position = droppedCard.getBoundingClientRect()
      const draggableTop = position.top
      const draggableLeft = position.left
      const draggableBottom = position.bottom
      const draggableRight = position.right
      const isCollision = this.checkCollision(draggableTop, draggableLeft, draggableBottom, draggableRight)

      if (dropedCategory === title) {
        if (isCollision) {
          ok()
          dispatch(correct(droppedCard, title))
        } else {
          fail()
          dispatch(resetCard(droppedCard))
        }
      }
    }
  }

  checkCollision = (top, left, bottom, right) => {
    const { title } = this.props
    const card = this.refs['card' + title]
    let collision = false
    const cardTop = card.offsetTop
    const cardLeft = card.offsetLeft
    const cardBottom = cardTop + card.clientHeight
    const cardRight = cardLeft + card.clientWidth
    const verticalIn = ((top >= cardTop - 10 && top - 10 <= cardBottom) ||
      (bottom >= cardTop -10 && bottom + 10 <= cardBottom)) || (top < cardTop && bottom > cardBottom)

    const horizontalIn = ((left >= cardLeft - 10 && left - 10 <= cardRight) ||
      (right >= cardLeft + 10 && right + 10 <= cardRight)) || (left < cardLeft && right > cardRight) ||
      (left < cardLeft && right > cardLeft)

    if (verticalIn && horizontalIn) {
      collision = true
    }

    return collision
  }

  render = () => {
    const { title, noHeight, elements, gameDetails } = this.props
    return (
      <div
        ref={'card' + title}
        className='agrupandoCard'
        style={{
          height: (window.innerHeight - 191 - noHeight - 30) + 'px !important'
        }}
      >
        <div className='cardTitle'
          style={{
            backgroundColor: gameDetails[0].secondaryColor
          }}
        >
          {title}
        </div>
        <div className='content' style={{
          height: window.innerHeight - 191 - noHeight - 30
        }}>
          {elements.map((element, index) => {
            let bg = $(element).css('background-image')
            bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, '')
            return (
              <img
                src={bg}
                className='correctAgrupando'
                height={noHeight}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

AgrupandoCard.propTypes = {
  elements: PropTypes.object,
  dispatch: PropTypes.func,
  ok: PropTypes.func,
  fail: PropTypes.func,
  dropedCategory: PropTypes.string,
  changed: PropTypes.number,
  droppedCard: PropTypes.object,
  title: PropTypes.string,
  noHeight: PropTypes.number,
  gameDetails: PropTypes.number
}

function mapStateToProps (state) {
  return {
    droppedCard: state.Agrupando.element,
    changed: state.Agrupando.timestamp,
    dropedCategory: state.Agrupando.category
  }
}

export default connect(mapStateToProps)(AgrupandoCard)
