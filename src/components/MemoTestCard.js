import React, { PropTypes } from 'react'

class MemoTestCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      flipped: false
    }
  }

  componentDidUpdate = (prevProps) => {
    const { flipped, correctCards, detail } = this.props
    let cards = correctCards.substr(1, correctCards.length).split(',')
    if (cards.length) {
      for (var i=0; i<cards.length; i++) { cards[i] = +cards[i] }
    }

    if (flipped === -1 &&
      this.state.flipped &&
      prevProps.flipped !== flipped &&
      cards.indexOf(parseInt(detail.id, 10)) === -1
    ) {
      this.setState({
        flipped: false
      })
    }
  }

  flip = () => {
    const { onFlip } = this.props
    if (!this.state.flipped) {
      window.setTimeout(() => {
        onFlip()
      }, 400)

      this.setState({
        flipped: true
      })
    }
  }

  render = () => {
    const { detail, height, width } = this.props
    const style = {
      height: height,
      width: width
    }
    return (
      <div
        className={'memoTestCard ' + (this.state.flipped ? 'flip' : '')}
        style={style}
        onClick={this.flip}
      >
        <div
          className='back'
          style={style}
        >
        </div>
        <div
          className='front'
          style={style}
        >
          <img src={detail.image} />
        </div>
      </div>
    )
  }
}

MemoTestCard.propTypes = {
  detail: PropTypes.object,
  height: PropTypes.number,
  width: PropTypes.number,
  onFlip: PropTypes.func,
  flipped: PropTypes.number,
  correctCards: PropTypes.string
}

export default MemoTestCard
