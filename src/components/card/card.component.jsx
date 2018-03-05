import React from 'react';
import PropTypes from 'prop-types';
import './card.component.scss';
import Draggable from 'gsap/Draggable';
import TweenLite from 'gsap/TweenLite';
import ThrowHelper from '../../helpers/throw.helper';
import { Back } from 'gsap/EasePack';

class Card extends React.Component {
  constructor () {
    super();

    this.state = {
      dragging: false
    };

    this.card;
    this.start;
    this.end;

    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragging = this.handleDragging.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  componentDidMount () {
    this.makeCardDraggable();
  }

  handleDragStart(e) {
    this.start = e.pageY - this.card.getBoundingClientRect().y;
    this.end = this.card.getBoundingClientRect().y + this.card.getBoundingClientRect().height - e.pageY;
  }

  handleDragging() {
    let converter = 1;
    if (this.end < this.start) {
      converter = -1;
    }
    let velocity = ThrowHelper.getVelocity(this.card, 'x');
    let angle = (38 * (velocity / 3500 * 100) / 100) * converter;
    let ease = Back.easeOut.config(3.7);
    TweenLite.to(this.card, 0.45, {
      rotation: angle,
      ease: ease,
      scale: 1.2
    });
    this.setState({
      dragging: true
    });
  }

  handleDragEnd() {
    TweenLite.to(this.card, 0.45, {
      rotation: 0,
      scale: 1
    });
    this.setState({
      dragging: false
    });
  }

  makeCardDraggable() {
    Draggable.create(this.card, {
      type: 'x,y',
      throwProps: true,
      onDragStart: this.handleDragStart,
      onDrag: this.handleDragging,
      onDragEnd: this.handleDragEnd
    });
  }

  render () {
    return (
      <div
        className={`card ${this.state.dragging ? 'dragging' : ''}`}
        ref={card => this.card = card}
      />
    );
  }
}

Card.propTypes = {
  draggable: PropTypes.bool
};

export default Card;
