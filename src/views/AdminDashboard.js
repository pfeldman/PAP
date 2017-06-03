import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import Accordeon from '../components/Accordeon'
import { setLevel, setArea, setGame } from '../actions/Admin'
import {
  getGameKeys,
  setBackground,
  setSecondary,
  setDescription,
  setText,
  detailsChanged,
  newCard,
  updateImage,
  deleteCard
} from '../actions/Game'
import ColorShower from '../components/ColorShower'
import ImagePreview from '../components/ImagePreview'
import $ from 'jquery'
class Dashboard extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      loaded: false
    }
  }

  setLevel = (level) => {
    const { dispatch } = this.props
    dispatch(setGame(undefined))
    dispatch(setLevel(level))
  }

  setArea = (area) => {
    const { dispatch } = this.props
    dispatch(setGame(undefined))
    dispatch(setArea(area))
  }

  setGame = (game) => {
    const { dispatch, area, level } = this.props
    this.setState({
      loaded: false
    })
    dispatch(setGame(game))
    dispatch(getGameKeys(game, area, level))
  }

  componentDidUpdate = (prevProps) => {
    const {
      gameUpdated,
      backgroundChanged,
      game,
      area,
      level,
      dispatch,
      secondaryChanged,
      descriptionChanged,
      textChanged,
      cardAdded,
      imageUpdated,
      imageDeleted
    } = this.props

    if (prevProps.gameUpdated !== gameUpdated) {
      this.setState({
        loaded: true
      })
    }

    if (prevProps.backgroundChanged !== backgroundChanged ||
      prevProps.secondaryChanged !== secondaryChanged ||
      prevProps.descriptionChanged !== descriptionChanged ||
      prevProps.textChanged !== textChanged ||
      prevProps.cardAdded !== cardAdded ||
      prevProps.imageUpdated !== imageUpdated ||
      prevProps.imageDeleted !== imageDeleted
    ) {
      dispatch(getGameKeys(game, area, level))
    }
  }

  createData = () => {
    return (
      <a onClick={this.newOfThis}>New Element</a>
    )
  }

  setBackground = (event) => {
    const { game, area, level, dispatch } = this.props
    const value = event.target.value

    dispatch(setBackground(value, game, area, level))
  }

  detailsChanged = (event, id, detail) => {
    const { game, dispatch } = this.props
    const value = event.target.value

    dispatch(detailsChanged(game, id, detail, value))
  }

  setSecondary = (event) => {
    const { game, area, level, dispatch } = this.props
    const value = event.target.value

    dispatch(setSecondary(value, game, area, level))
  }

  setDescription = (event) => {
    const { game, area, level, dispatch } = this.props
    const value = event.target.value

    dispatch(setDescription(value, game, area, level))
  }

  setText = (event) => {
    const { game, area, level, dispatch } = this.props
    const value = event.target.value

    dispatch(setText(value, game, area, level))
  }

  newOfThis = () => {
    const { game, area, level, dispatch, gameDetails } = this.props
    const details = gameDetails[0] || {
      background: '0,0,0',
      secondaryColor: '#000000',
      description: '',
      texto: ''
    }
    dispatch(newCard(game, area, level, details.background, details.secondaryColor, details.description, details.texto))
  }

  newPic = (event, id) => {
    const { game, dispatch } = this.props
    const file = event.target.files[0]
    let reader = new FileReader()

    reader.addEventListener('load', function () {
      dispatch(updateImage(game, id, reader.result))
    }, false)

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  deleteItem = (id) => {
    const { game, dispatch } = this.props

    dispatch(deleteCard(id, game))
  }

  get game () {
    const { gameDetails } = this.props

    if (gameDetails && gameDetails.length && this.state.loaded) {
      return (
        <div className='adminGameDetails'>
          <div className='section'>
            <span className='pull-left'>
              Background:
            </span>
            <ColorShower
              className='pull-left'
              color={gameDetails[0].background}
            />
            <input
              className='pull-left softy'
              defaultValue={gameDetails[0].background}
              onBlur={this.setBackground}
            />
          </div>
          <div className='section'>
            <span className='pull-left'>
              Secondary Color:
            </span>
            <ColorShower
              className='pull-left'
              color={gameDetails[0].secondaryColor}
            />
            <input
              className='pull-left softy'
              defaultValue={gameDetails[0].secondaryColor}
              onBlur={this.setSecondary}
            />
          </div>
          <div className='section'>
            <span className='pull-left'>
              Description:
            </span>
            <textarea
              defaultValue={$('<textarea />').html(gameDetails[0].description).text()}
              onBlur={this.setDescription}
            />
          </div>
          <div className='section'>
            <span className='pull-left'>
              Texto:
            </span>
            <textarea
              defaultValue={$('<textarea />').html(gameDetails[0].texto).text()}
              onBlur={this.setText}
            />
          </div>
          {gameDetails.map((details, index) => {
            return (
              <div className='section gameSection' key={'details-' + index}>
                <i className='fa fa-times deleteItem' onClick={this.deleteItem.bind(this, details.id)} />
                <div className='col-md-3'>
                  <ImagePreview
                    image={details.image}
                    className='pull-left'
                    onNewPic={(event) => this.newPic(event, details.id)}
                  />
                </div>
                <div className='col-md-9'>
                  {Object.keys(details).map((detail, secondIndex) => {
                    if (['id', 'level', 'area', 'game', 'background', 'texto',
                      'description', 'secondaryColor', 'background', 'image',
                    'title'].indexOf(detail) === -1
                    ) {
                      return (
                        <div key={'detail-' + secondIndex}>
                          <label className='pull-left'>{detail}</label>
                          <input
                            className='pull-left softy'
                            defaultValue={details[detail]}
                            onBlur={(event) => this.detailsChanged(event, details.id, detail)}
                          />
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
            )
          })}
          {this.createData()}
        </div>
      )
    } else if (this.state.loaded) {
      return this.createData()
    } else if (!this.state.loaded) {
      return <label>Loading</label>
    }
  }

  get gameSelector () {
    const { game } = this.props

    return (
      <Accordeon
        pages={[
          {
            title: 'Memo Test',
            content: this.game,
            open: (game === 'memoTest'),
            onClick: this.setGame.bind(this, 'memoTest')
          },
          {
            title: 'Grupitos',
            content: this.game,
            open: (game === 'agrupando'),
            onClick: this.setGame.bind(this, 'agrupando')
          },
          {
            title: 'Circuitos',
            content: this.game,
            open: (game === 'circuitos'),
            onClick: this.setGame.bind(this, 'circuitos')
          }
        ]}
      />
    )
  }

  get areaSelector () {
    const { area } = this.props
    return (
      <Accordeon
        pages={[
          {
            title: 'Prácticas de lenguaje',
            content: (
              <div>
                {this.gameSelector}
              </div>
            ),
            open: (area === 'lengua'),
            onClick: this.setArea.bind(this, 'lengua')
          },
          {
            title: 'Matemática',
            content: (
              <div>
                {this.gameSelector}
              </div>
            ),
            open: (area === 'matematica'),
            onClick: this.setArea.bind(this, 'matematica')
          },
          {
            title: 'Ciencias Naturales',
            content: (
              <div>
                {this.gameSelector}
              </div>
            ),
            open: (area === 'naturales'),
            onClick: this.setArea.bind(this, 'naturales')
          },
          {
            title: 'Ciencias Sociales',
            content: (
              <div>
                {this.gameSelector}
              </div>
            ),
            open: (area === 'sociales'),
            onClick: this.setArea.bind(this, 'sociales')
          }
        ]}
      />
    )
  }

  render = () => {
    const { level } = this.props
    return (
      <div className='adminLevelSelector'>
        <Accordeon
          pages={[
            {
              title: 'Primer Grado',
              content: (
                <div>
                  {this.areaSelector}
                </div>
              ),
              open: level === 1,
              onClick: this.setLevel.bind(this, 1)
            },
            {
              title: 'Segundo Grado',
              content: (
                <div>
                  {this.areaSelector}
                </div>
              ),
              open: level === 2,
              onClick: this.setLevel.bind(this, 2)
            },
            {
              title: 'Tercer Grado',
              content: (
                <div>
                  {this.areaSelector}
                </div>
              ),
              open: level === 3,
              onClick: this.setLevel.bind(this, 3)
            }
          ]}
        />
      </div>
    )
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func,
  level: PropTypes.number,
  area: PropTypes.string,
  game: PropTypes.string,
  gameDetails: PropTypes.array,
  gameUpdated: PropTypes.number,
  backgroundChanged: PropTypes.number,
  secondaryChanged: PropTypes.number,
  descriptionChanged: PropTypes.number,
  textChanged: PropTypes.number,
  cardAdded: PropTypes.number,
  imageUpdated: PropTypes.number,
  imageDeleted: PropTypes.number
}

function mapStateToProps (state) {
  return {
    level: state.Admin.level,
    area: state.Admin.area,
    game: state.Admin.game,
    gameDetails: state.Game.gameDetails,
    gameUpdated: state.Game.updated,
    backgroundChanged: state.Game.backgroundChanged,
    secondaryChanged: state.Game.secondaryChanged,
    descriptionChanged: state.Game.descriptionChanged,
    textChanged: state.Game.textChanged,
    cardAdded: state.Game.cardAdded,
    imageUpdated: state.Game.imageUpdated,
    imageDeleted: state.Game.imageDeleted
  }
}

export default connect(mapStateToProps)(Dashboard)
