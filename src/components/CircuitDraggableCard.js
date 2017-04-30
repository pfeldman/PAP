import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import Draggable from 'gsap/Draggable'
import TweenLite from 'gsap/TweenLite'
import ThrowPropsPlugin from '../utils/ThrowPropsPlugin'
import { Back } from '../utils/EasePack'
import { dropCard } from '../actions/Circuit'

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}

class CircuitDraggableCard extends React.Component {
  componentDidMount = () => {
    const { card, width } = this.props
    let el
    let fromTop
    Draggable.create(this.refs['card' + card.id], {
      type: 'x,y',
      edgeResistance: 0.5,
      throwResistance: 20000,
      throwProps: true,
      maxDuration: 0.55,
      minDuration: 0.35,
      onDragStart: (e) => {
        el = this.refs['card' + card.id]
        fromTop = e.pageY - el.offsetTop
      },
      onDrag: (e) => {
        let velocity = ThrowPropsPlugin.getVelocity(el, 'x')
        let angle = (fromTop <= ((width + width / 2) / 2)) ? velocity.map(-3000, 3000, -38, 38) : velocity.map(-3000, 3000, 38, -38)
        let ease = Back.easeOut.config(3.7)
        TweenLite.to(el, 0.45, {
          rotation: angle,
          ease: ease
        })
        $(this.refs['card' + card.id]).addClass('dragging')
      },
      onDragEnd: (els) => {
        let elsa = this.refs['card' + card.id]
        this.props.dispatch(dropCard(el, card.posicion))
        $(this.refs['card' + card.id]).removeClass('dragging')
      }
    })
  }

  componentDidUpdate = (prevProps) => {
    const { resetTimestamp, reset } = this.props

    if (resetTimestamp !== prevProps) {
      TweenLite.to(reset, 0.3, {
        x: 0,
        y: 0,
        delay: 0.15,
        ease: Back.easeOut
      })
    }
  }

  render = () => {
    const { width, card } = this.props
    return (
      <div
        className={'circuitDraggableCard aa' + card.id}
        ref={'card' + card.id}
        style={{
          width: width,
          height: width + (width / 2),
          backgroundImage: 'url("' + card.image + '")'
        }}
        id={card.posicion}
      />
    )
  }
}

CircuitDraggableCard.propTypes = {
  dispatch: PropTypes.func,
  card: PropTypes.object,
  width: PropTypes.number
}

function mapStateToProps (state) {
  return {
    resetTimestamp: state.Circuit.resetTimestamp,
    reset: state.Circuit.reset
  }
}

export default connect(mapStateToProps)(CircuitDraggableCard)
