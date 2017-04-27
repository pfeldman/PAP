import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { getGameKeys } from '../actions/Game'
import MemoTest from './MemoTest'
import Circuitos from './Circuitos'

class Game extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isWinner: false,
      time: 0
    }
  }

  componentDidMount = () => {
    const { dispatch, game, area, level, levels } = this.props
    const time = levels[level - 1].time

    this.setState({
      time: time
    })
    dispatch(getGameKeys(game, area, level))
  }

  componentDidUpdate = (prevProps) => {
    const { newWin, gameDetails } = this.props
    if (prevProps.newWin !== newWin) {
      this.setState({
        isWinner: true
      })
    }

    if (gameDetails !== prevProps.gameDetails) {
      window.setInterval(() => {
        this.setState({
          time: this.state.time - 1
        })
      }, 1000)
    }
  }

  getHeader = () => {
    const { time } = this.state
    let timeNiceMin = Math.floor(time/60)
    let timeNiceSecs = time
    if (timeNiceMin > 0) {
      timeNiceSecs = timeNiceSecs - 60
    }
    if (timeNiceSecs.toString().length === 1) {
      timeNiceSecs = '0' + timeNiceSecs
    }
    return (
      <div className='gameHeader'>
        <div className='counterContainer'>
          <img
            className='counter'
            src={
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANAAAACECAYAAADhu6WVAAAACXBIWXMAAAsSAAALEgHS3X78AAATS0lE' +
              'QVR42u2dfVBTZ77Hvw/EJMhLAiWYSJAYUlsUCVVT2aYqa2uxTveWtrMtne1U9HZ7Z7ptF2tvt7vbtbbdvfXeae8yfbl3Z7ZTsdPeOn' +
              'W2pbfeXd1axRdaLegGxOJLgkECBEGSQDCJBs/9IxATeRFITkjg9/lHCeEEznM+83s5z/McxnEcCIKYHAI6BfzCGCtC7r0a9F4sgECo' +
              'hChRCk+/GLOlgChJDgC40i+AMNELABAlysHiRSMe7OrlTgx43UE/c23ADXevFZ5+MQRCO5zdVqQqjbh4zoCe1kaO48w0CjyOL0WgsE' +
              'hSgNtXPwBX7zIAckgUUnjdSUhRZCIjBxAlASlzgBR5ZH4hS73v34tG4LLNgf5LTnCcBZftgPdKHVIyDGjat4/kIoEif8IUuSsQL3wM' +
              'AuEyiFNkEM2WQZ6bDIkcUGqj/w/otQK9nUBrPdDb0QYW341eqwMC0Xc4f2wnx3EGGmUSKHwnSKUrBVAKYcICJEiUkOcmI0sbuWgSKb' +
              'pMQKsBuGTuhsthgfdKC4CdnLl2J10FJNDEIowoabNfGJUuGUqtLw2bSXicvlTQXNsHl8OCK66z8Djf5jqaDtNVQgIFnwR14SZcG3gM' +
              'woRbMb8wDRr9zBNmPEIZa4D2Rl+Ecvd9gbaT73AcZyeBZqo0V90/R1qWL8rk6EmSiaZ8J//qgb3NAhZ3EObv35iJTYkZJdBgPVMOiX' +
              'whSRPmxsS5Q260nGgblGnzTIlM014gxpgK2csqIBAWIkc/B4uK6YKPRGS63NOMy/adnKXhdRIoVqPNwNUtyMxTI+9+0bTrmsUClnrg' +
              'zIE+dJ47DcY2T8cGxLQTiKkLt+HK5fVYtFZO0SaKGhCn9gJnq1shTvkfrvnoyyRQdKVpUmQvqwR3rQjLfyaJiRuaMzkqGap6cMV1GC' +
              '115bHeeIhpgfziSOSroStNpjQtxhoPdbs8sLcZIBA+zRlrGkggEoeYTHp3fJcH1jMG9HX+nrt0YTcJxOcvrNS+h3jBE1jzgoTEmYYi' +
              'tRpOI0HyZKxEpJgRiCkWPg2B8A/40ZPpVOPMkIgUA6ld1AvENPp8OLu/gPZBNXXVZphINds9sLftQUtdWbTemI1agfx1jjRzLfQbRD' +
              'Q3bQY3G77+TwfiZ/0pGtvfUSnQ4E3Qd1H0TDpkOXQREYCpBqj/ygSPc0M03ZCNKoEYY1Lk3LUT6fOLcNcGEV01xCj1UdSkdVEjEEUd' +
              'Ytx0mYDq/+pG/KznpnrBX1QIxFS6KshvW0tRh5gQ3273wHpmD2euLZmRAjGNPh+XbbtxT3kWRR1i0tHowHtWiJOLp6LlPWUCMXXhJg' +
              'iEr2DN5jTqsBEh10ZHPujDpZa3Ir18YkoEYipdFbKXFGPpo2IafSJsnNoLNH19iLvwj1XTUiDGmBRK7bf40ZO5NJuA4C2l+6aiFfOW' +
              'rOCOftwybQRiGn0+rg3shn4j1TsE/ynd5y87Aazj+55RRARiitwVEM7+Cg9skVC9Q0SM/e960N38b3zWRbwLxNSFm5AifxOrn6MWNR' +
              'F5jn/mRufZP3OnDzzPx+HjeJVHmb8FoqRtJA8xZSx9VIxs3XMsQ3OEj8Pz9nQGpi7choVrnkfeOiGNIjGl+Gbx61mG5gh30Xh31Kdw' +
              'LO/+D5C5+J9p+QERVXSZgP3vfM21Nd4XtSkcyUNELbIcYPXza1hm3t+jUiCmLtxG8hAxIVGYaqKwCcSU+Vug0T9P8hAxIdEdD+vDEY' +
              'nCIhBTF25CcsZvkbcugUaHiJnGQt66NUxduG1KBWKK3BVIlr2G+39N3TYi9iTK0JQzdeGmKRGIFT6RDeCvuKc8mUaDiEnu2iBCsuw1' +
              'pshdEVGBGGNSXDhxGA9vo7k5RGxz91PJEM7+ijEmjVwEyir4EveUZ9HcNiLmESUBa16QYM6C4xERiKkLtyF3zUqaVU1MG1LkwMp/UT' +
              'Nl/k5eBWKK3BVIkZdTu5qYdii1gDK/hOXes46/CJQg+QR62vyDmMZNBeelHeOthyYkEJt3x0HoN1LdQ0xvip5JR1bBl+N567hnYzOV' +
              'rhRzFy0PZ90jTRCgfOW8cb234tAF2F1eGlyCf2Q5wNxFy5lKV3qzfefGPRubZRV04advp4dTnupfLIV27viiWX27EwVvHaPBJSLH/2' +
              '7p5Iw18pBTOKbSVaHomfRw/m52lxeGtr5xv38i7yWIsLDkkTlMqX0vpBSOafT5kGau5aNlXfbpDzC09UGaMMuXemqkWJWTCgA4aLKh' +
              '2mgflO0qKg61jnwMnQKqtAQY2vtQdbKLBp0IH0otkJS2njH2ymj7cN88ArkcH/HZdaus7YChffToYmjvQ1Xj6GKU3anAq8Xz8cWGfJ' +
              'TpFDToRHi5+6kkzF302aQiEFPpSnHrSm24u27SBAHKdAqU3Tl31BpoVU6qPxoBQIvNjcrvO1BZ2w5zj3vEn9n++EK/lAQRFlLkQIp8' +
              'FdPo80faOnjMJgJT6Yx4eFtOOMUpXzkP5auyIBFPfjuGHbUdKK86C7vLi63FarxaPD/o+xs+/YEkIsJHrxXY/UYtZz1957gjEFPpSn' +
              'Hbj8MmT5EmFVUb80cUp77dCUNb37DIokoToyAzeViUWq9ToGSxDJXfd+CXK7NGTOtIICKsUUiqyGWMSW+shcYKA78P13SdkaLEeFKy' +
              'QJFK8mQoXzUP2am+7bQlYkGQPA631/86QfBSC7mdlQBKbipQOKNP5eMLsT6guHe4vag42Iqte5vHfQxzjxsVh1pRcagV5SuzsHWtep' +
              'goRe+fgLnHhTKdAtUmOw04Ef4olCzT3/jyyF04gfBX4Yg+FSULguSpb3ei6P0TE5Jn2DEPtaLgrWOob3cGvV6+Mgt2lxcVh1rpnhHB' +
              'D+rC9BtXrw4TiGn0+UifnxvqZ5XpFEEplk+e42G5uM09bhS9fzxIovU6BcpHqIcIImzk6IG4+CfHjkAux1vIuz+k+z6qNDEqHlowTJ' +
              '7xzGWrfHwhDC8uhzRh7FrG7vIOk+iPJQugSqNHDhE8kiTLDZypPVygtHl3IEUectNgqEZxuL0o+bB+XPKUr8zCep0C2rlJ45pkOiTR' +
              'UANhSECC4I3F60SYv/zlEQViioVPQ10Y0pw3VZo4qO4p/+LsTbtsQwxN6ZkIdpcXZZ/+4P96VU4qijSpNNAEP8hygLj44pEj0CzRz5' +
              'CjDzn6DHHQZIvI/Ziqk104aLIFRTKC4I0EiXJkgSSKkPOfksWy6+nU95G7mbl173n//x/Mk920hiKISTM3L53dMu+BIIGYSlcaavpW' +
              'slgWVPtEcjZAtdGGFtv1VLEkT0YDTfBDlhZIUTwUHIGuujaG+uDfgrnJQWlVpAn8zIJM2uuR4IkUOcBdWxQskCjp9lBnXRdpru/DMB' +
              'U3M6sD6qCCTNq3geCRxFQlEDiVJ31+SjiPb7hhpsBkZNwKdXCEaewaU8zAVrkqjfa5J/gU6JYkv0BMpSuF9ieSUI8ZzrTpxvVAAFC+' +
              'KgtF758YVaJq4/UINDTplCB4YXaqhDGm8qVwLG5NOJZsB07wNPe4Jl7DNHYF3RQliKglQwOkZeX5rnju2qJQZx8Avik7Q2t3VGkJ47' +
              '6BGlg3Fb1/YtQO2s1SOJrGQ0SUeUs1PoEkCmk4jmd3XQ29dmrrm3QDIrDuCbyxShBhR5QEODrkvhTO6w5Lyyow4hTlRH46TUHAylXa' +
              'hJHgFVkOcNk2KFByRlj2fAuMHIEzEiJF4Bw4Q5uTBpngnTjGmBQsPizbVgVuP6WdmxTRmkSaIMCDAbXTWFthEUTYBAJQgCxtWA5m7n' +
              'EHrc8p082N2B8SuPyhxeamVakEv1jqgVSlMS7cx604eOH6Rb0qKyKTOqUJApSvuj4DO5KTWIkZjDjFGXaBKms7/JM6JWJBRBa43biA' +
              'r+LQBRpcgn8MVYY4Xi7oPdc3DXkwT8brlrsli2VBey9s3dNMHTiCf1rrAYAfgSprO4Luw2x/fCEvq0QLMpODIlx9u3PUTegJIqz0dr' +
              'RxHGeP4+v4JR82BE3LqdoY3s3fizSpqP7FkmF7LxBERLjq7gV8XTg7HNawH9+34ceJoB1Dtz++EBUlC0JuLGwtVuPAM8Hy+DZWdNPA' +
              'EpHB3dcFAHEcxxnQ28lPjTU4ty0wEv1yZRYMLy6fVDQq0ylg/p0+aJvgIXmobU1EDEs9IBBVAYNPZ2CL7rOg+FeZfH2eKk2Mqo3aYZ' +
              'vEt9jcqDrZharGrqClCDemaiV5MpQslg1bolDf7vQ/pIsgIsb+dz2o/1LOcZzdJ9AdD5nx42ez+f7crcXqMR9t0mJz+5dBqNISxlzT' +
              '89re8/TgYWJq2P1aE3f20EJgaEWqzWIFwL9Ae5tRWduOrcXqoA1IhshOFY8pjcPtRdXJLmzd20z1DjE1dJmAuPh9Q1/6IpAyfycefO' +
              'OxcD+JbiykCQKU5MlQpPFthDiaOC02N6qNNlQbbahq7KKIQ0wt31T0oWH3vKHnBPlCgEBUBUv9Y6FuqjgR7C7ftleBW1+p0sT+NT3m' +
              'HhdFGSK68DgBh/WHwIds+QRqqdsDaaYHOXrRVP5+5h43SUNEL8YaAKgIfCkOADiOs8PeZqEzRBBjcOaAiTPX7hwm0CCN6LXSSSKIkT' +
              'i1FwBeufHluID87u3BCXIEQdxY+9R/2Xxj9AkSiOtoOoxTeygEEcSNHN/lQVL6QyN9K3gy6WzpAUrjCCKALhNgPbOHM9Y03Fygc4d/' +
              'g7pdHjprBDHIdzs6OXNtyWjfDhKI4zgz7G0GeGhHG4LA/nc96O/56VhviRuhYPpXnPicTh4xszHVAN3nP+A6mg5PSCCuo+kwzh9tpi' +
              'hEzOi6p/6rY5yl/tmbvXXkFaksrgzHqRYiZiAeJ/C3NzvRUrd2PG8fUSCuo+kwrGcM1JEjZpw8e/+jE5fMtwfOd5t4BAKAlrq1OPIB' +
              '5XHEzJHn85edSJ+/fLzyjCkQx3F2OHt2wFRDJ5eY/vLsft0BYB139OOWifzomLvycJb6Z3HsE2ooENNbnq/f7oEiV3uzjtuI7QKO48' +
              'Z+g0afD4GwButeoaf2EtOLLhPwTUUrOpryJ5K2jTsCAQBnrGnAFdcWHP+MFuoQ0wdTDXD4z8dCkWdcEcj/xsy8v0O/cQ2UWjr5RGzz' +
              '7XYPLA1VnKWhNNRDjXtnUq6t8T5891ETukw0AETs1jt/ecmB3s5nwyHPhCIQADDGpFDkNuChN7MiuQEJQYQlZTv2STM6zy4NJWULSS' +
              'C/RLeuMGHN5jSSiIiJqPNNhRPOnh3jmZrDWwrnT+U4zo60eUvw9ds91N4moppTe4G/vNQM7xU9H/JMKgL5f7DwiWz0XDhBkYiIOrpM' +
              'wHc7OnFt4N+55qN/5POjJi2QP53LXlaHFT/PgSyHBo6Y+nTtyAd9cFj3o6WuLJy1zmiE9JwRjuPsjLFluNLfgHvKs0giYsrEOb7LA+' +
              'sZAwTCpzlzbUOkPjqkCBR0oAzNEdzxsB6LimlAiciJc+JzwFRzBilzHh1t34KYEAgAmLpwG0RJm3D/r4U0ugTv4rTUtkKY+NJI203F' +
              'pEAAwBS5KyAQfY6iZ9IppSN4SdXMtW0Qp/x2KsXhTaCA5sIeqHTLseQRGngiNHqtQOPfrtc4U5CqRVSggJRuEwauvoo1L0iQIqcLgZ' +
              'gYXSag4as+dJ8/igTJi9EkTkQECopG2Uu0WPqomK4K4qac2guYajox4P0/mL/fHIl2dNQK5P8gla4UAmEFljwyh2Z0EyOmaXW7PLhk' +
              'bkb8rNejob6JKoH8H6jUvoektPW4+6kkSuuoKQBjDXDuUCsEwiM4d/g3HMeZY+lPiLhAAWldJSTy1dCVJpNIMwxTDWCu7YPN8g/ECf' +
              '47VqJN1AgUIJIKspyPkZalpYg0QxoC/T0muPu+4CwNr0+HP2tKBQoSKXtZBSTy1cj/STLdP5pmkWZQGrSdfCeaGwIxK1BQandb0evo' +
              '7SxBxoIMLF4nIplisKZpb+yGy2HBtYGPcP7Y9ukmTdQKNCwqqe78HbhrqyDNVJJMUZyaXTjuRqexHX2dJsxK+DCWa5ppI9CwyDR/+c' +
              'u46v4nSOfKoC5Mh1ILWoc0RcK0GoAuYxv6bRbExVfj/LE/xVr3bEYJNOyXVulKAZQiLn4JMjQZmLdERPeWIiCMvb0bwsTjcPdWTmYT' +
              'QhIoeqPTBng9JZidpoRotgwqXTJFqEnQa/UJY67tg+dyFy73WCAQfTeTI8y0F2jUCOX1lEAgUiExVYkURSaytIAsh6QawlIPOKyAta' +
              'kPYO1wdNjhvVIHl20Pd+nCbjpBM1igEaNU9rK1fqkkCimueW/BLap0ZGiAlDmYlvegeq1Abydw0QhctjnQf8mJfpsFgBUJKXU4vX83' +
              'x3EG0oAEmqxYKuTeey96LxYgMTUPA1clECXKkCARYNbsOcgYjFjRKpil3vevwwo42j3ou9gNYaIXNosVokQ3+m2NSMkwoGnfPkrBSK' +
              'CpEKwIBSUF6GrWQCBUQpQohadfjKR0MWaJpbjSL4Aw0YtZYinihRIA8Es3GTxO4OLgzq/cgAeefqv/M64NuOHutcLZLUWCxApntxWp' +
              'SiNcvUa01J2mSEICTR/pAsm9VwNRUtIowjjRtM8Y+BLHcdV0FmOH/wfLGk9K4N8CWQAAAABJRU5ErkJggg=='}
            />
            <label className='time'>
              {timeNiceMin}:{timeNiceSecs}
            </label>
          </div>
      </div>
    )
  }

  render = () => {
    const { game } = this.props
    let gameUI
    switch (game) {
      case 'memoTest':
        gameUI = <MemoTest />
        break
      case 'circuitos':
        gameUI = <Circuitos />
        break
    }
    let fireworks = null
    if (this.state.isWinner) {
      fireworks = <div>GANASTE</div>
    }

    return (
      <div>
        {this.getHeader()}
        {gameUI}
        {fireworks}
      </div>
    )
  }
}

Game.propTypes = {
  dispatch: PropTypes.func,
  game: PropTypes.string,
  area: PropTypes.string,
  level: PropTypes.number,
  newWin: PropTypes.number,
  levels: PropTypes.array,
  gameDetails: PropTypes.object
}

function mapStateToProps (state) {
  return {
    game: state.Game.game,
    area: state.Area.area,
    level: state.SessionService.level,
    newWin: state.Game.win,
    levels: state.Levels.options,
    gameDetails: state.Game.gameDetails
  }
}

export default connect(mapStateToProps)(Game)
