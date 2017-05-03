import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import { resetCard, correct } from '../actions/Circuit'

class CircuitsCard extends React.Component {
  componentDidUpdate = (prevProps) => {
    const { droppedCard, changed, dropedPosition, index, dispatch, ok, fail } = this.props
    const card = this.refs['card' + index]
    if (prevProps.changed !== changed) {
      const position = droppedCard.getBoundingClientRect()
      const draggableTop = position.top
      const draggableLeft = position.left
      const draggableBottom = position.bottom
      const draggableRight = position.right
      const isCollision = this.checkCollision(draggableTop, draggableLeft, draggableBottom, draggableRight)

      if (parseInt(dropedPosition, 10) === index) {
        if (isCollision && parseInt(dropedPosition, 10) === index) {
          if (!$(droppedCard).hasClass('correct')) {
            dispatch(correct())
            ok()
          }
          $(droppedCard).addClass('correct')
          let containerTop = $('.availableCards').offset().top

          $(droppedCard).css({
            'position': 'absolute',
            'left': draggableLeft,
            'top': draggableTop - containerTop
          })

          $(droppedCard).animate({
            left: card.offsetLeft,
            top: card.offsetTop - containerTop,
            marginRight: 0,
            marginLeft: 0
          }, 500)
        } else {
          fail()
          dispatch(resetCard(droppedCard))
        }
      }
    }
  }

  checkCollision = (top, left, bottom, right) => {
    const { index } = this.props
    const card = this.refs['card' + index]
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
    const { index, width } = this.props
    return (
      <div
        ref={'card' + index}
        className={'circuitCard'}
        style={{
          width: width,
          height: (width / 82 * 100),
          lineHeight: (width / 82 * 100) + 'px'
        }}
      >
        {index}
      </div>
    )
  }
}

CircuitsCard.propTypes = {
  index: PropTypes.number,
  width: PropTypes.number,
  droppedCard: PropTypes.object,
  changed: PropTypes.number,
  dropedPosition: PropTypes.string,
  dispatch: PropTypes.func,
  ok: PropTypes.func,
  fail: PropTypes.func
}

function mapStateToProps (state) {
  return {
    droppedCard: state.Circuit.element,
    changed: state.Circuit.timestamp,
    dropedPosition: state.Circuit.position
  }
}

export default connect(mapStateToProps)(CircuitsCard)
