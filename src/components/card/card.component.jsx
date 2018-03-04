import React from 'react';
import PropTypes from 'prop-types';
import './card.component.scss';
import Draggable from 'gsap/Draggable';
import TweenLite from 'gsap/TweenLite';
import ThrowPropsPlugin from '../../utils/ThrowPropsPlugin';
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
  }

  componentDidMount () {
    Draggable.create(this.card, {
      type: 'x,y',
      throwProps: true,
      onDragStart: (e) => {
        this.start = e.pageY - this.card.getBoundingClientRect().y;
        this.end = this.card.getBoundingClientRect().y + this.card.getBoundingClientRect().height - e.pageY;
      },
      onDrag: () => {
        let converter = 1;
        if (this.end < this.start) {
          converter = -1;
        }
        let velocity = ThrowPropsPlugin.getVelocity(this.card, 'x');
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
      },
      onDragEnd: () => {
        TweenLite.to(this.card, 0.45, {
          rotation: 0,
          scale: 1
        });
        this.setState({
          dragging: false
        });
      }
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
