import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'
import CircuitsCard from '../components/CircuitsCard'
import CircuitDraggableCard from '../components/CircuitDraggableCard'
import { win } from '../actions/Game'

class Circuitos extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      details: []
    }
  }

  componentDidUpdate = (prevProps) => {
    const { gameDetails, corrects, dispatch } = this.props

    if (gameDetails) {
      if (corrects === gameDetails.length) {
        dispatch(win())
      }

      if (gameDetails !== prevProps.gameDetails) {
        const copy = JSON.parse(JSON.stringify(gameDetails))
        let shuffled = []
        while (copy.length) {
          let position = Math.floor((Math.random() * copy.length))
          shuffled.push(copy[position])
          copy.splice(position, 1)
        }

        this.setState({
          details: shuffled
        })
      }
    }
  }

  ok = () => {
    const { okSound } = this.refs
    okSound.play()
  }

  fail = () => {
    const { failSound } = this.refs
    failSound.play()
  }

  circuitsCard = (index, windowSize, cards) => {
    return (
      <CircuitsCard
        index={index + 1}
        key={'circuitsCard-' + index}
        width={windowSize / cards.length}
        ok={this.ok.bind(this)}
        fail={this.fail.bind(this)}
      />
    )
  }

  render = () => {
    const { gameDetails } = this.props
    if (gameDetails && this.state.details.length) {
      const max = parseInt(_.max(gameDetails, detail => {
        return detail.posicion
      }).posicion, 10)
      const cards = new Array(max)
      cards.fill(null)
      const windowSize = window.innerWidth * (90 - (6 * cards.length)) / 100
      return (
        <div className='circuitosContainer'>
          <audio ref='okSound' src='http://pasitoapaso.themonstera.com/ok.mp3' preload='auto' />
          <audio ref='failSound' src='http://pasitoapaso.themonstera.com/fail.mp3' preload='auto' />
          <div className='availableSpaces'>
            {cards.map((card, index) => {
              if (index + 1 < cards.length) {
                return (
                  <div key={'circuitsCard-' + index}>
                    <CircuitsCard
                      index={index + 1}
                      width={windowSize / cards.length}
                      ok={this.ok}
                      fail={this.fail}
                    />
                    <img
                      className='connected'
                      style={{
                        marginTop: ((windowSize / cards.length) + ((windowSize / cards.length) / 2)) / 2,
                        position: 'relative',
                        top: (((((windowSize / cards.length) + ((windowSize / cards.length) / 2)) / 2) * 41) / 100) / -2
                      }}
                      src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABJCAYAAACEjYBsAAAACXBIWXMAAAsSAAALE' +
                        'gHS3X78AAAGI0lEQVR42u1bTWskRRh+ZgiIIEwpeFmU9EHEW9qTYNpk9CCChx1ZT14ywauQyWKft3fxlD44e/KYyQ9' +
                        'QJifxZA/bKwpierwIC+LEPzDVsOAH4niYt7KV2qruno+kenosGNJTXUlXPf1+PO9TFUwmE9j6jLePmM3n6z4bsNs63' +
                        'As5gITFfoQStLrl538FIADQ517I/gcEeAnAQwANAmbtAfkOwCt03SqDldgGpAPgGbreBDDiXuiuMyAjAkK0BoAz7oX' +
                        'BugKSGPrvcC/sryMgzYx7N7kXJtftQmWzkB8ApNL3LXKh5roAwpXvnxncKLmuDFSGoCq35wikU6V/DGDMvbBddUBuS' +
                        '9dDAN+z2G8BeNsw/viqQbENyI7sFiz2RwDAYr8BYF9jKQKU3jq4zCX3YbHfI2vZUQItADS5FzpVBCTKCLACmAfEaOW' +
                        '2SYG2t2xgymIhKYBHGeOYFGdkVtsCsNSYUptMJvZy7vTtJgBGLPbdnLFdAqZFYMjtPoCAxT6vAlNtANjK4xks9jsAT' +
                        'MH0gApDZ9UBmWkBpKo5AE40txsAgkUJXFmYalrU3Fnscxb7bUrLatvLKBhXKsvMs4hfARxq+je5F3LuhZ2lAyLMT/r' +
                        'pGsa53AudOcxVFG0bs1a1LPYfsNjvEijnGvf5e+EsQ7T4DwB/AbgB4B1MJb5/yRw3AfwO4B6Am5QuEwC79Ce+ZLH/I' +
                        'ffCLwC8SMWacIV3AXxE113KFi5VtADw/LxZguZ9rHSnxF8iwYALA0LRuQ3gMSFbB9CXJi3885xSX4M4wVaBZ4jf4bi' +
                        'sjqltn8X+3JSce+GnNMeXlbT8C4A3i4ItAImkt6ydHPfCtwC8D+BPivQ9sqB/JADPaPgjAF/TOJFaU2Wip2RlF1yCU' +
                        'uui3EZnLUMAzSKgmAA5pToCBWKMw2I/kYgWVBOl/jcAPCubMMWNGwBeBdCfxbRz5hUAuKNxoYDiTi4giWT+hcAocyO' +
                        'F7RMAtzS3XxcvMCvLJJrIv7KNCNw9pfYRrZeV0epK8WSsOlcQlJ/p5Q6UtLyVBUpdU4Yz25tFSwSFs9hvKusToES6d' +
                        'QpAbiukhqFara8RmRo6UAQgPym8IakSGiz2+9Bvpj8FSl1TdfaXoSuUEJQupuJ1pqXUxttHKpFJiVtUDhQpLScGlv2' +
                        'BYJhr04i0bWlIWwpgVCdLGCgm5FQUjJaBrDUBuCz2k9p4+8gB8Jvib7UKgtGlQtVVaqqUxT5Tg+qJUghV0TIOqF5ra' +
                        'FLyU2nXrXjoaBv6T6Ds+WwQVXcUFlcVy2gTGLua24e6ylcE1f6SJ+JaBsKlE0jHGjCGVPFqZYAN8q+9jIUx+VAtaSB' +
                        'NcjPGYr9DeT3BdCeujakyVjPoJx08UdAc5dmHeXpFwZcRaWLFhYtkcazaePuoSbRWRvIQU/lQ9A1owS08kRDlh9zC9' +
                        'GwHJCYoVLJEqqgZsmXEARVji7hI1wQGbV9kNhFD1GLuc+X7rsEPobGuhnK9O8OaRgum1QNT8CwChsgyzBBIzy24/2h' +
                        'OMJo5Ok5hN6xTfBgqQDwE8A31n0uukWooLyS3yuMwqTTudBk0nPTgHQAfG56XKRnqXEbk6YvgKcRjTPdoHAA9FvsBv' +
                        'QmXspJ4I670e47cL30iTHf4I2VBk3kthJ7lZrhziqnSPpOUYe04BIH7rbIAt4jyTpnkLMcS26SDzNRs/r8M1wTjADk' +
                        'HYMh6o4whC+3v2Nzs1smUbtb+MN3rGdKq4DELbXbZtBCdb/McYSrA5d0+2UX6i5I62xYSzBFzTDwjKMozygyIToTqZ' +
                        'bhKNyOA9pY1KZuA/KiLIRowOpge7daRxwFlpqXpvzZjyOO8zEMnlnWF55CKtGjZk7IJyAuavkhRufYyCNeV7ArYdJk' +
                        'dTd970rXpBEL7KrdIbFrISEO5m1SbjAyAnMzDPlcFEB0Be80gGaSUZbpXPSmbgOjSromBRiz2g+uYlM0YUiQOpETHr' +
                        '+1Ek23qnqemzVy+r7KF5Cnzw+sGwzYgebpHYGNSNgHJigv7V51eywiIKaPcXeRE8yoDAgPxCmxOoF4yMNq2J1EWQO6' +
                        'WAQzbgAyIeN237SZlIWYcBbcd1gWQdhlPOv4HIlUm+zkZdxIAAAAASUVORK5CYII='}
                      />
                  </div>
                )
              }
              return (
                <div key={'circuitsCard-' + index}>
                  {this.circuitsCard(index, windowSize, cards)}
                </div>
              )
            })}
          </div>
          <div className='availableCards'>
            {this.state.details.map((card, index) => (
              <CircuitDraggableCard
                key={'CircuitDraggableCard-' + index}
                width={windowSize / gameDetails.length}
                card={card}
              />
            ))}
          </div>
        </div>
      )
    } else {
      return <div>LOADING</div>
    }
  }
}

Circuitos.propTypes = {
  dispatch: PropTypes.func,
  gameDetails: PropTypes.array,
  corrects: PropTypes.number
}

function mapStateToProps (state) {
  return {
    gameDetails: state.Game.gameDetails,
    corrects: state.Circuit.correct
  }
}

export default connect(mapStateToProps)(Circuitos)
