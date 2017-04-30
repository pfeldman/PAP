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
      time: 0,
      isLooser: false,
      nearLoose: false
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
      this.refs.tick.pause()
    }

    if (gameDetails !== prevProps.gameDetails && gameDetails) {
      window.setInterval(() => {
        if (gameDetails && !this.state.isWinner && !this.state.isLooser) {
          if (this.state.time === 1) {
            this.setState({
              isLooser: true,
              time: 0
            })
          } else {
            if (this.state.time === 13) {
              this.setState({
                time: this.state.time - 1,
                nearLoose: true
              })
            } else if (this.state.time === 1) {
              this.setState({
                time: this.state.time - 1,
                nearLoose: false
              })
            } else {
              this.setState({
                time: this.state.time - 1
              })
            }
          }
        }
      }, 1000)
    }
  }

  closeGmae = () => {
    location.reload()
  }

  getHeader = () => {
    const { time } = this.state
    const { gameDetails } = this.props
    let text = ''
    if (gameDetails) {
      text = gameDetails[0].texto
    }
    if (time === 12) {
      this.refs.tick.play()
    }
    let timeNiceMin = Math.floor(time/60)
    let timeNiceSecs = time
    if (timeNiceMin > 0) {
      timeNiceSecs = timeNiceSecs - 60
    }
    if (timeNiceSecs.toString().length === 1) {
      timeNiceSecs = '0' + timeNiceSecs
    }

    if (timeNiceMin < 0) {
      timeNiceMin = 0
    }
    if (timeNiceSecs < 0) {
      timeNiceSecs = 0
    }
    const header = (
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
            <label className={'time ' + (this.state.nearLoose ? 'loosing' : '')}>
              {timeNiceMin}:{timeNiceSecs}
            </label>
          </div>
          <label className='gameObjective'>{text}</label>
          <div className='closeGame' onClick={this.closeGmae}>
            <img src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKYAAACjCAYAAAAARWXEAAAACXBIWXMAAAsSAAALEgHS3X7' +
              '8AAAJw0lEQVR42u2dPW8byR2Hf7uWLPiwBzKA09wVolNdJ6ZJdxAP+QCmq6SKqXqLMPcFTH0DGghrr/IFTq5SCVjhUl0KU507U4XT' +
              '5ICIMZFY0lmTgrO5JcWXfZndnZ35PYBwMnwiqdnH/5fZmVlHCAGymtnIaQJoA2jJr+jPEW0AjTU/fh77fgzgCsBEfo09X1xxhNfjU' +
              'MwFCTtSts4W6VQwlcKG8r9jzxcTXgmKidnI6UoJOwAONPhIl1LUEMCpzVHVOjFnI6cHIBKyofnHvQAQSEknFNM8GTsAIiEbNf01Lg' +
              'AMbYmkxoopa8YegD6AfcN+vRMAgeeLkGLWR8iWlLFX4+iYKop6vggopt5CDgA8t7BXuJS16NCUNF97MWXKHloq5DJTORa1F7TWYs5' +
              'GzkCm7QadvCdov84pvpZiyi47MLCpKSLF9+rYJNVKTJm2AwBP6VwqzqWgk7p8YLdGUnYxv89MKdNzCOCdLH0YMRklteRCRs8xI2a+' +
              'WpJRUi0HAN7oHj21jZhy4F7QIzujp3ZiMnWXjpZTS1qJORs5bSnlAX0pnRMp6BXFvC9lCE6WV53auzpMK7maSNkD8IZSatEYjWWQs' +
              'FtMKeUrOqENDdm196wVU3belFJPXlUpZ2U15mzkBOCKoDrw0vNF3woxKWX9OnbPF6VGT5dSkgQ8l9fNTDFlzUIpKac+YrL7NkbOoT' +
              'E1plyy9h2vqzEcFX0Ls3AxeUeHcmonplyQMaGUxvLrolYmuQVLyUhpNqHcNl2r5mcIrhIynQaAUxmE9BdzNnL64LSQLRzIIKR3jSm' +
              'bnTe8XtbxJ88XQy3FlCF9DO73ZjOkWSoPKKXVKKs3lYkpJ9G5T8du9mVw0iOVyymDMTg1ROY883xxqkPEDCglifuQN6XnFlNODR3y' +
              'WpAYjbwpPVcq5y1HUlRKzxsxmcLJJoZZU3pmMeW5QuzCybYuPdN+ocypfDZyJuCcJUnGk7SHKLgZpRxQSpKy5Cs2YrLhIRn5Js2R2' +
              '1ki5oBSkiyNUGERU97heccxJhlJvB0jbcQccGxJDhL7k1hMGS25+JfkYT/peUhuEbYTktejRGIyWpKyo6ar0nJCErJVzK1duZy3/B' +
              'fHkihm47xmkojZ5xiSsqOmm/cFCMnI800rj9wtabwH3hMnFURNN+sPEqKAfmox5RQRt0yQItmX63pTRUw2PaSydL5JzC7HjJRAN7G' +
              'Y8vACNj2kDBrSt0QRk9GSVBo1KSaph5gyrHKFOik7nbe3RUxGS1J5d75KzA7HiFTAgncLq4t4GjCpmF94vrhaFTGZxokWUdNlGid1' +
              'EJP3xkmVtO+Jue5mOiElcrgqYlJMUjnRfCbFJFqmc5f1JdFWzOXbQYToEjEpJtGFVlzMFseDaMJ+XEw2PkSrzpwRk+hI042HT0J0q' +
              'TNd3vEhOoq5wzFYjfu4jb2vh3jwxc/Tuz+9e42b7/u4+zBR/l4PfzPAzpOfH5v06R/nuP6+j7sfx3aOPxuf++x+1cNnv3uzICUA7D' +
              'x5ike/H8N93FYq5aNn4YKUAPDgi0M8ehYqfa+6iUmWpNz77au1f+88bCgTJpLSedgo/L1qRscFJ9cTS6lSmG1S2i6nC6BJJZNLqUK' +
              'YpFLaLCdTeQYp8wiTVkpb5bQ+lbuft/Dw62Hmn08jTFYpl9/L2WtaIabVhxvsHvQzi5JGzrxSxt9r56seU7nxA/BLNQljk5yqpIzY' +
              '+VWXYpJ8cqqWks2PJYh/TwqTsygp7/5p/N2g0PnwZwir/2V+3sJnf1D/QGFxO5uLuuspf+3//OWJ8tuimnFsfcS8+zDB9dmR+rS+6' +
              'xUi5fXZkelSMpVH3L4NCpGzCClv3wY2XJIxxayJnBZJCQBXFLMGclomJQBMKKbmclooJTxfTFwAU+qop5w2SgngImp+xlRRPzktlR' +
              'KRj0zlGsppsZQAMInEvKKC+shpuZQAEDKVayYnpQQ8X4RM5SnlvPnhRWGvf/PDC+uljBqfSMyQ2m3HfdzGbvvbwl5/t/2ttTsil9M' +
              '4a8wUUha9dM3iHZErxXSEEJiNHEH9qpMyjriZ4r/fdWw86GDq+aIZj5gLuZ1UJ6XlkXOhpIzEZGeugZSWy3lKMTWW0lI5pxSzBlJa' +
              'KOdp9AzJBTGjSU1Kqd/GMUvkDO5di9j355RSz92Mhst5uSowuuu6IkpJOUtisPKarOuKbMHZa9Zm37eBR8RM13n3fzE9X4xh4aJhF' +
              'UfErOL67KiY3ZdmHREzXG56VkVMK6Pmgy87hUh5+zYobFWSIUfETAGsPc3MejGLkjKiLluDdYqW98T0fHFqWzpXeUTMuvWUquU04I' +
              'iYjdFyVcS0LmqqWgO5bZGvSjkNWLfZ3xQt14k5tEnMT+9D3F68LFRKlXJenx3VfeXRueeLrYN1T0zZnV9aVRf+rY+f3p4UKqUKOQ3' +
              'ZetFP8j+t21oxsK0S/3jWSy1nVlGyyGmIlMcy8GUW07omKK2ceUVJI6chUl54vkgc8FaKKQvTISwkiZyqREkipyFSTgH00vzApl2S' +
              'ASzl41kPN38/hrhZTBriZoqPf32mVJRIzlXvZdB23n7SFB7hCLF+u89s5AQAntsqqLPXhPu4jQdfdvDpfYhP78PS3uvuxzHEtRH7B' +
              'E88X/RSj8cWMVsA3oGQjHUlgM62Ocu0qRyeLyYAjjm+JGNdmUnKrWJKhuBRhaREKROJKV98wLEmKaXMdXtqY425VG+OARxw3EnRUi' +
              'ZN5RE9jjspQ8pUYso3ZCNECpcyVSpnSidlSZk2lcdTOrt0AsznKVuqpcwkpvwQfV4T63mNnFNCSlN5LKUHsPh2peW89HxRaHDKLCb' +
              'rTWvryX6SFehV1JhxOrBstbvl9WSnDClziynriy6bIeM5KaLzLiyVx1J6G/Ozjxq8hsal7p7c1l0qSh6nIv8ldRg5jeIcQLsKKZVF' +
              'TEZO46LkwPNFpVtrlIpJOY2Ikj25DhdGiUk5WUtqU2NuqDn5mBb9Ocb8tqJWRwMVEjFjkbOJ+R71Q15/pm1txIwJOgTwR7qgjZAD3' +
              'R8IUYqYUs4u5nvVWXdWw6UUMqjDhy1NTClnC/PNbU/pCYXURsyYoB3MN7ix9iw2ZQ91a2q0FpOCFsoJgKDuDxWrVEwKqozo6OhA1y' +
              '67lmIu1aADzFcssUnazmvMn8MYmPaLaSVmTNCmlLMPLkRe5gLz2Y1TU6JjbcRckrSN+Qa4LoB9ymiujLUS01JJp5ivNTgFENoiY23' +
              'FXFGPdjG/J98xoCY9lzKGfEx3jcVcE00jSduaR9RLAGMp4pgiGizmmgYqkrUlv9olR9YLAFdSwCtKSDGTRNdmTFgsfZ+GcMX3Exvr' +
              'QpX8DwJzr3n4o6HKAAAAAElFTkSuQmCC'} />
          </div>
      </div>
    )

    if (gameDetails) {
      return header
    }
    return null
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
    let won = null
    let loose = null
    if (this.state.isWinner) {
      won = (
        <div className='won' onClick={this.closeGmae}>
        </div>
      )
    } else if (this.state.isLooser) {
      loose = (
        <div className='loose' onClick={this.closeGmae}>
        </div>
      )
    }

    return (
      <div>
        <audio ref='tick' src='http://pasitoapaso.themonstera.com/tick.mp3' preload='auto' />
        {this.getHeader()}
        {gameUI}
        {won}
        {loose}
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
  gameDetails: PropTypes.array
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
