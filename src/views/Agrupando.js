import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { win } from '../actions/Game'
import Loading from '../components/Loading'
import AgrupandoDraggableCard from '../components/AgrupandoDraggableCard'
import AgrupandoCard from '../components/AgrupandoCard'
import $ from 'jquery'

class Agrupando extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      screens: 0,
      screen: 0
    }
  }

  componentDidUpdate = (prevProps) => {
    const { gameDetails, elementsEdited, correctElements, dispatch } = this.props
    const windowSize = window.innerWidth * 90 / 100

    if (gameDetails !== prevProps.gameDetails) {
      const parentWidth = ((windowSize / 6) + (windowSize * 2 / 100)) * gameDetails.length
      const vieweableWidth = window.innerWidth * 94 / 100

      const screens = Math.ceil(parentWidth / vieweableWidth)
      this.setState({
        screens: screens,
        screen: 1
      })
    }

    if (prevProps.elementsEdited !== elementsEdited) {
      if (correctElements.length === gameDetails.length) {
        dispatch(win())
      }
    }
  }

  next = () => {
    this.setState({
      screen: this.state.screen + 1
    })
  }

  prev = () => {
    this.setState({
      screen: this.state.screen - 1
    })
  }

  getNext = () => {
    if (this.state.screen < this.state.screens) {
      return (
        <img
          onClick={this.next}
          className='nextArrow'
          src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ4AAACeCAYAAADDhbN7AAAAAXNSR0IArs4c6QAAIZpJREFUeAHtX' +
            'QuQnmV1/v69ZTfJkhASEkIwCeDgBRUpWq6DBbQWHLDC1ApiS6mXWhWno9QiXqqtt1aptoyj1o4OHcSxprUUSxUcFdDAgEXrBURBgyG' +
            'BQELYTTbJ3vqdf//n5/nPf97b93/fv/+i78zuOed5nnPe877vYRM2S6hlv16rtgCOO7sAeuy4xYXwEDGHfKqcI+as0CzoAV1oD7bQ+' +
            'sWQdNMuiIHs5Yfs5d66OUid7tWTg9hrj9tr/XT66L2W3zND2CsP3St99NqgVNnPvA7hfD74fO4d86Bl9jevjxw47Lz0VublBs7XpOd' +
            'jz+bmDacXetA9zcsAUBNd3b/bD9Dt/eRe52NPes+O3K4OQ6PTruzZrUfp1j5yd93cq6OpKpDclaFo9FXpXt14pKr3qKJ+2TWresSq6' +
            'uKficrql33BaFhslbXLqF91f3wXIb/TB+40v+r+2upXdfm9WLeqntoutQSgk0HqJNfXeql1q3iMXqnZaR+d5vMjdvpoRfKL5HDPll9' +
            'azTIvt8xaOHRqzar16KtMm/qYVetjzpbaQ1vN1IdqK9AAyqqD+in1qtKil27blEetShs6c8q+Zq2URzML5GAZNVA7pVaMNkaDvV22k' +
            'xodP1DeVEyNGI2cL1bnuguNF67XyaWiiTJqSK3YOiFdiEffbIvkcH4RP/XRYvQxGuk1Vhc6V+E6nV54p/lysNgaIV2I50tM0ab0yHu' +
            'kPkqKPqQN8dJnjIbP4/IL1Ul9AN68k1zUiakR0oR42assDfru1MY8VhmaMmrEnDVmn5Y6MQ/SktAIiuZxrZgaPo2Pk318vI/jHkN1t' +
            'FbHKQ/i0/o42dPH+zj0G6OB1mWTaqQ8ADYskoNc2FANH+/jpL6Ld+G+HPRbhfU9lItz4ejPx/s4yQ/x2MNno2v4HsPaIFWva8TkuzQ' +
            'uHHtYvIWJ3oWjlmVTcqIfgDZy5Vi4hVEp5xAVzePaPj9Uv5mbcpmSlKpvbhSR66udyll6C+P+xI/R6JzUOOZxLE0shn4svXAuPJQHP' +
            'mRD9ev5KRedotXNhXJdvAuX+hanMR2n9BXK1bV8se8xUjlLb2Hox8W5cMnzcajrs8H82MuN1VnNhHJdfAqutTpGX6l4KA+8ZUOX7+J' +
            'jcUtnYdJbKo7zuPLAu2wwz/UQumCsTudJ7Mu1OAtDXc2F4tg8lw54mdb1KBrXMXrQeCh25YVw4XVt5MRYb65+OKtgjMbKE8yXa3EWZ' +
            'tXROh3H5FgawfSyamuNK/ZefiPJ0mhMx5KqsVCMHrXOqgVtiGOd5Vt71XUxlxqjsTb15VmchUldjXPMPnrQWCh25QGH1XWAW9Z54Q2' +
            'xi9d42TF61XUFtzCfHpzPOmuGLjPEuzb15VmchUltxtnXXCjWuaKXZeEWNqee++zjnRfdKGDxFiZyxl1+o2yL1pcLvdYA532Awfo4a' +
            'Cxr5vkuUYqEeGsjX47FxWCsYR/7M+byLa1grHdpgHdirQfQmI5lP8ZcvtbpmPOEw7JwC/PpwbmsWc+6dBTwcdBo68uxuBiMNezL3hy' +
            '7fK3TMecJp1eI13qOzUtvCDSXErOWfSnNMfuaa7TRovdhrnzkuKzuoa7zXaqPc23iyrHwGIw17Mv+HMOHRX8cu3xodU3gnAcs1lqXH' +
            'oOxhn3ZFzEsY+grlrP0PszaC3qf5X7qOt+l+jhrE5fewmMw1lThyxm4rhXjnFoH3GfbLrsh1rgvZq4sX9rgWjhDLObKRx3LttV2Xag' +
            'Lt4oK5tNrTsc6n3n2XTqXhnH2XXUEl6W1Lqwu9nxqu+xcqzGO2ZeyHMOHxbaIYV15GrdiC+O6wmO5cPCWbcmxLlmSXLhV0KfXdXSsc' +
            '5lnn3WMW76Fcb7P15zE1uI9wLdcLEBltYbjkF+UlxaQC4u2QjHnIgdW5wJ32Ra9dYGS6MKtoi6thWvMFcfgrIGvrT5LiMf5oEPM1se' +
            '1XC4lxeDQwEq65QODDenQBvSwOk/rELt0Ppxz4fO+5oD5LhZF2Lr0Gtex1GAMPiz2QKwt54NjjH3wsMyJL8vHzSlaNcDYtlwuERr3x' +
            'eC0lXI+zOKhRyuIYTkHGgtjvU/HnPZbavBlQ2hh4LR1aTWuY6nDGHxY7INYW85P4aDV9bme9qHt1PLFp/jQwkof8LWN5VinfYllofZ' +
            'c1B6HcPBsmzX1Q4jIwjiZfUurMR3rPZi3fGCwnA8sZK0cxrRvxYLxwp6CNS+UBQ3f4hiDD8v1NKZjnzbEMa99K07BRGutZv98eRBaG' +
            'Di2Lp3GfTFzlg8MVvaHX9RaNXAu1GQNOFjWAINtXiyAhmWcfaERa+vjtFbHvlzmfL7mrFgwWdh/LnJ/bur0JerYXeLJAWCNztexaIH' +
            'BMsY+eFjNhXAXz3XYZz3j4mcr1y/ue8WbRp+2av3g2qHh2aVDQ31L+vuzkamp2t7JAzPjByZmxrf9bHbr9R9/4lc7duxpXnA9ufVhm' +
            'LN8YLBSAr5Y9hvl65gL1/mco33UAM65wGI00Fq2nu+9bCurgek8SDXui8HBSg342moOPHDEqRb5bMXP3vCxNes3Hjt42pIVfacMDda' +
            'e3TdQ2zA7OztUJz2farVs3/RU9sDUgewHYzunbrvnu/tv+dx7d2xTKXg8bUWmMV8MDnmIYYFbNoQJL4trWXFdZOiAa1uvh4cCqWPg2' +
            'lo6jflicLBSH762mgMPHLFY+BYnmCxotM1e93erNzzzpOELFo/WLujrzzbU1SV8mpnO7hnfPf2lu27ct+naD7QMIR5VW9lVMI1bMTB' +
            'XDnCfZU77MbGlEcxa9X5x+RDoGDhbl0bjrphxywdmWQuT3gT3cdCY9t1fXnv6YRsH3zIwVDtZBJWtWjZzYCK7ectPJj/+4Yu33pXvg' +
            '6EpYjkHvrQuPuKQhV6sLK2fQ5/EXTHnQuOy9T3wWBDpGDhbS6MxXwwOVmrD91lw0CMWy77FA2ux79209kVrNg79Zf9gdpwQ3VxTB2Z' +
            'v+8WPpj6YMIB6KCRmDL4cQ3PALBvChJfF9a3YhQnOq14HDyYE+yzUvqXTmCsGDsv7AouxrHH5unZT9+r3rlx70jlL3j80UjtbH66bc' +
            'f77wdmJ8dnrbvqXsb/5yqd27sz3xuO6Bod5aVXrLB66GGtpBJOF2nNRe2xpoGVbr4PHEIJ9FrJvaTTmi8HBYl/EsC5ceGh8vjP/g18' +
            '74qKVh/W/L6+yWEQ9snZt+/n029593oNfzfvBA7NlX1qWmDGXr7U6Rh5wttqPiS2NYHrN9hOCByWozbU0GnPFwGGlOHzLhjDm2Uddw' +
            'Zofp56zbMnl16656qAVfW/N0UER9dAaGV3Rd96LL162/Ke3H7h11yNTM43ecC60ihhW8FSfc6xcxrBv6bbswdNNcww/xVpawRjXPvg' +
            'm/uorVq592WXLNg0O1U4r/QZLLDi4qHb8SectPeXA/v4bf373xP5GaZwDOyGGFZx9jhmH77KozxZaYDoGnmxTBs/aVGOuGDisNApfL' +
            'HzgiJmD7+Pa8v/sE4c9/cSXLf5y/u2RjUL2+sr7PPwZv73oxctXDHztB7fsHW/0izOjfY5dPrRiWWPF0EIHC9xlY3Vt+WUOnm6CY/g' +
            'x1tIIxrjPb3Jv/sSaY447Y/jf89/Er247eSKwYfR3s+eufEN21LJzs+H+Q7LH9v0or8C/RUos6JH39eV/UPLsRecsO3jghhKGr3kfx' +
            'pY+DnJoXDFwWK0H3mJZxH6LqBFYPGPsSwpibTWneYkZ8/maa8YXv3PlutNeufQrtb5srWxYdNWygexFh380O2r5uS0ldkx8P/ufX/5' +
            'J/scU8i+j1az8G88//dLfj738pmse25XvgCkXiw/ZGL6PZx18WM4TTJbGEM+xT/KsBefCWvhOvuLhkVGQY8sH5rPMaT86/p1Xr1x29' +
            'muXbOrrr61Hc0WsDN2ZR1ydHbms/bsuSwbXZOuWvih74ImvZlOzE0XKB3Pyf2gOyX/ZfeH9d+zb9Oj2qelGAu4B+aEYOrFay5jFIbc' +
            'oh/w229eG2IBvY8lw8cBhdXXgsLqW4JqzYmB1/QWXLbkq/7PVo/VmKTGGbsNBL3GmrRg+Jjt7w7X5L70rnJpOiYHB7AVv+OTq9+R16' +
            'mdr1IOPcwsMrCGpG8a0Fjms1z7nMOfCWeP1YwfPWySBRMOwnMoY+6KxYsEYr8cfufmIS/NvDP8eF071Y4YONbsxfIuX1i553/Xrzmm' +
            'cl88sbeh7sDDOYV+0sjSm4zlV/OdgfuwvtbqQL2YOvmVDmPD4kCPD5zzGan/6kVVHP/344c/mWj6X5EavlKFD0ZGBlZX/sju6vO/0g' +
            'cHadffcvs/16zruBW2J1RjH8GEtva8Wc8l+GV/xuHFuADgsOB0Lzhj7rhzR4AOa7LfOWvK3MT+61ExQTpGhQ4nKv/LVsmVnXnSQ/JL' +
            'LC3cQe2fITdFbWtSBjdFAW7cYvOTElipxgbUHY9qXOITJznXd+64//LyBoayjbxCfuObKzPd7utAxqx6+RUtqF7zjXw87EWc2+sGd4' +
            'd50LCngjPQ6FOKRF6uDnm3+703lrthmWOfy0ZnwrBEcWN2uOHykf836wcuRUMQuGzoye9aK1xRJbcmpevjWP2vRX+Ubtpyf4pZeIgL' +
            'cK2xESjmSmMEr0hRyYNGtji1cNPgALxYYbJP7i0+tPDf/R2hjEyjgrBp5XlbLv9Ncxqpy+PKv6i94x7XrTvL0ifvhw2gMsS7DOcIh1' +
            'lbnWTFyLC6LGTyd6C2oxY3YyrEwR7oJS379Y+UR/W8xFQng/mn5Hm15q8rhW3/MgJy3eX7l60N0es+6nitO2qfI4PHGSZs1EjlH+xy' +
            'LXGJ8cCx+fV1+zdoT8v/o5hjERe32vXdmeyYfLppu5lU1fIPD2WmXvG/1EeamcyDuTN+nsBpDDGtp5qq2f+acdtaDdDp4ntJtlKtJj' +
            'UusMSnGGDS1dU8fvKBtpwLA5Mx49u2tb8tmZicLZLtTqhi+2dmsduzpQ3Lu5j0oXzfEOnDAEHfVljl4chBZ2s6h6Z9xMajXVmHjM4c' +
            'HR5bUzm0jCgJb99ya3fTgny+I4Rs9uP/8gscMpen7DsWheiZf5uCZG+QgNw4fFjk6Bg4rPD6a2CvftfKEHF0GoAy7ZezrC2L45F+mL' +
            'v3AoRvVmfmO4IsNrbI0oX2afDcGr7mZcvRhYy8Kumz1ur5TVc1SwoUyfEcfPyTnx33wfbKv7wR64Kx1+dCWZkODx43IpjrutJGO6g0' +
            'v7Tul0wZc+Qth+EZXDKScX+5a37eOXddROh4aPN+GKU2naGVP0eMDPXCN2uLFi7P8P0s8FmQVtteHb3BR9pzAuXGHfHeBlI5ovY+Om' +
            '8U7GbxmkYodXJ5s0/R//y0jh+ff7x2peO+sl4evfyA7YsMzhuWv1WjeC/nOR4+4s5TcFG1z67IGD5tr29yIHGgASawxcE67/rhFRzn' +
            'JkoleHb782yr9L710+QY6bso9aq2OqWz6+3Cy5Zc1eFZtjfHB2IdOMAsH32KXHty/rgWoOJgbvjf23LdaDlnf7/tGsutWou9ZFUAer' +
            'KLjw6oHr+MGXUcZHKgtdXFV4VvGbsq/1dJbw7doJFuScF55D+tNGHP5CduEpVUPnq8DPqClc/F1vK9/dtRKqhrrteEbGOrr+j+AZdz' +
            'xfA6eq38ZLB46joHX+vv7hl0FqsZl+O7Z9cXSt5E/Xjth9duT6g70z+Kv4sDd6HwXDl2Ih65U24uDF3XAmdkM/6V9lL5M0THLX5k98' +
            '+CLyixZr7V9zx3Z5u3vT6o7NZXtyxMwPNqiluDggM2r7fXB48tiP5uanNkzHzcnQ3fq2g+W9rN7OIMM3Y1bLsmmZvYCirJT+zNXQst' +
            '9RRXroqjXB895FdOTs/jrHZyasoleGzo53+RU2z309MDhTRbs4O3dM1vuD8/hRhy2F4dOWt29fWa7o+Wehhfs4G2798DPu3WzvTp0c' +
            'v7Nm8bv79Y9lLnPgh28Gz4ztiX//XK5P7Vp3GwvD93MTLb9jpvH9O/x9N9zYpxq/qFeHzznJW57YN90/vu8+6q8wl4eOjn39IHZH3v' +
            'O77w7T07XqF4fPL6Itouc2DPzHRaU6ff60MlZx3c3z4+7gdVXIbiL09quxL04ePqS+MLg1+1j26YqGbyFMHQyHVt+PCnnb7mTxtQAk' +
            '5D9Bt1iQnyLuKxgPgcvdGDmLX/2ps89sTn/hlqp30heKEM3O1t79Nr37P5hWYPQ7TrzOXgdn3XzDeNj+/bO3NRxoUaBIw96WU99c9h' +
            '3roknZv5z584J/gfSJwcneiuHMZePGqXYqgfPdQjGcRDBLBy8aR/+xeSXTSIRXNS/PDtl7d/0zJ9IhNr/6f/u7+Tcyffc6Ad5sKE2n' +
            'XxZg4dGYJ0b5oTWSKwxX34Ld82VO7+Z/0Bkx99MXr34Bdmi/lL/g7Ws6B+DtRzQCGYms59c/abt/2dQKZC+cx1zLR/Humi/rMHTG5b' +
            'ZKNcSH3Hd/vLefVM7t09/RjeQGg+U/MMuVQ2dnOvhB6f/qXE+3IfLpl4D9LhjxKXbqgZPN5p6EL5IqYUYdVGvjn/hQ49fk3/V6+gvP' +
            '3lk7/fyny6eQv2ObJVDl/+F3A9c9UeP/lfjTkJ94t5wXyF9EZ5rsy+1dNysHxo8ncgx+82CiU4ZNbLv3zw28fjD059M3LtFPj65Nbt' +
            '7B76QtFBJQZVDJ41sv3/qql27kv+lQlKtu7Yw0Va+8Fe2+n6iQXMcWz4wy7ow4DiwxK4P0YBr+vn/iunuU89ferb8TekCFlnb9t6eL' +
            'R44NFs5EvqvBu3qVQ/d5P5s89vP2IIf2JOhweCwbzc3h1o61BAF+746HXOhr3gdb6AO4zqYC8f+wuNDsDZffq93392TVyKhqL112zu' +
            'ze3Zem5xe9dDJn0vfdeMEzsf3pX3cDeP6PJrTsegtTNcpHFfxFU+awVcwtuxD0/aVq5ELrehkQee13/mPsa1nXHjQIUPDtefNpRX7v' +
            'GX8G0lf+aofuizbtX3mox/544f+O/FEMjypA6T1iLVNbKVVXubgSWUMjM8yp33EqCWx9SG8uX52+77bTnz50jPy/7nKoaYgEpThGxl' +
            'Yla0aea43oxtDl/9fvb91xUseuWIq/zn3fMkAWB/Mic+L9cAxSIi7aud78OSwGCwcHDFbcLDMtfi7dkxPH3LY0K1Pe8bQ+fnfNNDRf' +
            'xD0YGD4ujF0s9PZQ5s+8fhr7r1zXP/4E+4ClgfJGjSXzsKBhSzvGdK28J0OnhSTh8eCr63wGBD4sBpHjBpaB15wa9W+/829Txz9/JE' +
            '7Vh0xcF4uGLBEsZgM30DfkuzQkeNb/lRjy9g3sq8/+Prk/0Yidl/RybeIbrt+4sJNH3tsayOPB4r9lLJaaw2Phek8HSfl4HFhdTGJL' +
            'Y6xkA+ebawvOv5AP4zBb+OuvG7tmeuPXfTp/Ak7Gj4pfOjI87OnjZ6ZD+FItm3P5uyX+d+jV+XKh27ix7ccuPAf3vjQ9/J9eMjwwBr' +
            'jWFrjGD7jIR8821hf6yRuWfJosmDnovbPmueYfa4F3LIhTHh8oCZitkHuii+uPWvjs4euzoUd/bIrG3Vrzc5ku3+yef8lV71u2135n' +
            'jI0sjA8LmtpYjBoUqxoZaE37VuxYM0V80utiOWxeXHMvmgQawtO4xIzxjHnaFxzEvOq62/5t7H7j3r+yOZVhw+8tNPf83Hxqnz5cfY' +
            '7b5h41dVv3S4/8oSH9Q0bWmFNCANvWexpcWVhsxg8KYjHt4przhczB9+yPgz9iAY69KVjxi2utvn68YeWrxy4cd0xQy/M/w/Yq5DQa' +
            '1a+QfzVz4y95gsf2rGFerMGCrSLs4aHMfa5Fnyx0MAyx7zGo2J+KPZ1ssUxxr7kIk6xomW99q3YynHpsiOfNzr85qsPfvfS5X0X6QP' +
            'Oa1zLZnY/PHP1+1/1yFW7H9433ehFHpw/BOYYA6ExC+dcywcWY0UjC/tov04qHhjsLB5JAPYhgLU4xtjnWsBhNQecrfYltjDUcvHOn' +
            'Ld9/rDTjj5u0V/n/3+MI6XIfK6pydkf/vDb+668+rKH7877wBBJS/DxwL44RsM14cNyvmCyNIZ4jn2SZ63FAWMbPXiShIdEAV/MHPw' +
            'YyxrtF4l1Ds5RW3fkoqHLPr36tctW970+/73fQThU1+xMbcejv5r6xw9fuOOaxx/fJ4+KD2kBPh67rJhrw4+xrNF+TCwaXpUNnmzCj' +
            '84xfBcvOHPaT415P86t4ye8ZOnoH1y+4uKDV/ddmu9a+AcMpFjMkm8IP/bQ1Kc/967d191755j8hTs8XFKiyiFz7YV9xcqydHPM3Gf' +
            'wrHXxjMPvaPCkCB5S+xxbGmCWdWGMi69j7BnioIOt18l//7fooitHz1q9fvAVixb3nZ7ffcff+5MNGmv/xPjsTdsfmNz0z5c/9q1HH' +
            'tyPH/yTB8QjstW+jqWsYPjgmH3OYxx+jGWN+LJQV/t1UvHA2JY6eFIYw+DyLV4PCnKhZau1mrNydY6lASY2O+sPl684+YLFJ69YM3j' +
            'y8GjtxIGBbGP+DV3sVdd4P+X/sjA9md23b2z2O48+NP3dGz/7+Hfv/Nr4GOXg4diyL1KJ8cFxjO+qhVxYrQNuWcFkIWcuao8tDbSwS' +
            'YMnSfryY2PWwY+xrPH5zKFPxti3eMFkaV0de85Jo8Onnr9k48oNfUctHu1fMzBUW5J/W2Zpf182nH/fbSL/Gw32TE1mY3vHZx7aet/' +
            'k/d/8/O5f3H/P/gN5Mj8SfFipDV8s++AYK8tH7RjLGvFloQ/t10nFA9O248GTgngs7esYOljmBdM4YrZl+XpvjrVvxYKFFj+QaDmGb' +
            '9kQxnyMj71ZC4wt+9Aypn0rdmGC84r+BjKS8PCIxWrMFTMOP9ViP50HXKws8Nqvk134xA+H7RiDb1lgkic+PhDDQqd5xrVWYl7QCgY' +
            'fljHOKcWP/ZML3owfFThj7AvPMXxY5oFZVmNWHmPipy6+8NRcS6/rIYaVHPg+a3GMWT76AadjjYNnqzWhWHK1huvBr2t48ITAA0NkW' +
            'UujMV8MDpb3BaatpUnBcA7URcyWOX2BOuY8y9d6VwwcVmqJj5gt+9CJlQVuLnLXYC3nwIdFncpsWYMnDfLDsY/mgcFyDjBtodE4YvB' +
            'sxcdiHTCxLhwai499FJeOcfiwsi98sfCBI2bLPnSwmhNcloUDm1PMfdZYKObcKL/I4Elh62E05ovBwXJNYLA4CGJtwVs1wCEHMawLB' +
            '882Ret7KBcH3LLApB/xEbssdGJlQTcX2Z9jNHbmHJqUX+bgyfb6cXwxOFjOBwY7d7Qn6wPXFjrLQmtxGrMu0cJ0nsSWTmMcwy/Tohb' +
            '3AwzW4hgTXxbrrbguSv1UdPBkH+shNaZjzmPO8oHB4myIYV04eFitQ2xZnQONfgTgsD6euZAP3mfByd7wxcLXOMfal1gW584hcZ+T8' +
            '8oePGlTP5ovZs7ygcHiGhDDAtfWx/s4XUfiFL31EIyFfPAhK32JRuuAW5Yx7UvMC3WB6Rh4rG3m68GTArEX7NJpXMd6D/CwOARibcG' +
            'z1RrE0OgYOKzmmxcEQW4tjOima+l8GHOWDyzWSiMubbPJhgMd52hNKOYaIW2T72TwpIh+MBTWuI51LnhYXQc4LOcDg0WuZTvVhC7Zx' +
            '2uOY8sHpq2cS2OIQ5zFMyY+FtcUTMfQFbKdDp5saj1mDMYal8/1oYFN5USPxTWAhWxKjvVIGnPFjMOHlR7haxviLJ4x8bFQ2xWHcPB' +
            'Oaw2eiFMu2aW1cI1x7PK5H2hgmRMfi3kfJpylRU5Rqx9O6oQw5uHDcr6FWTzrmBfft3SeT5vCtdQtY/Bkc9fjaVzHOpd59lnHuOVbm' +
            'ORbi7XC69jKicFaLlklMFfUD+UxL9tz7PJVm82Q9U1Q1WQ8yu/24ElT1uMy5vI516WxcMa4hvgxS+fH5EBjPZrGOGZfaiCGZYx9F88' +
            'any+cLK5jxXWRoQMebV2DJwVSL9ylt/AQxjz7ui9wsDi4jnUedGytHOaL+PohpYbGfDFzqb7ey5WPczEPrCzbVrvMwZMmXY9n4SFM8' +
            'xzH+Kn9WJfM+1h8DNZ26XlSCGOefdmPY/iw6Idj9nW+pfdhrnzkRNtuDZ40ZD1iDMYa9nVN5tj36TQnMZauATzV6ofnfM1xzL7kcOz' +
            'yfTrNSSyLa80hNgauFBu63BBvNeHLsbgYjDXsy/6+2MdZuS5M8DJWzCNrDccuH735eOYsvQ+L4aDR1to3833FkwL64XRRV+zLs7gYT' +
            'Gt8sY9Dz1ojuIX59OC0NS+7IbK4EKb5lFhr0auFW5hPDy7Z+i4axWI00LL15VmchUk9jXPMPvZmjH2rlpUDDFbXAB5jizwk57Av++l' +
            'YY5rXMXq2cAvz6cH5rLNm6CueFC168aE8i7cwqwet03HRHMnDsmqCS7XOB2gU0nwolrSQRvPo2cItzKcHV9jGDJ4UL/oIoTyLtzBXD' +
            '1qr49g8l07wKpb10EUxnadj7t/iLIxzivreulUPnjRtDQMfxsXH4pbOwly9uLToMcRDZ1nv5ecJFm9hUlvjOrY0gsmytD68nuTJA1/' +
            'YplxqilY3FMp18S5c6mtOx5aG+7L04H0cNKnW9fhSJ5XTeh1zby7OhSM3xENn2WBu6gWn6rmpUK6Ld+FS2+IszKVN6Y+1nfqhh3HxF' +
            'm5h6M/FufBQHnifDdWu58b+UouNXI8KPmRD+T6+COfKceFW/ylanR/1CI0klzYVl3JFctC7Kxd8KbbIpRbJ4WZj8n2aIlyRHO65Ct/' +
            '3wC7OhaM/H+/jJD/EYw+fja7hexDfBkXzuGaoho/3cdjDp/FxMfnQxNqYB/FpfBx68Gl8nOSHeOzhs0k1Yh7A2qxonq4VU8en8XG8V' +
            '0gX4rlWWX7ooUI8+vDpfFxMPjQhG7NPS43U3+NxclmPFVvHp/Nx3LP4VWn1PohTHiVWG9KF+CK9IacUm/II1oad5nPN2FohXYjnPcV' +
            'P1ev8TuLYAcEeIX2Ij60DXYyN3bOlVhmXXkYNNJVSK0Ybo8He2naSq2sVepxGkZjcGA16StEix2UL1yrrcsuqgwOm1IvVxurQw3za2' +
            'AeN1clZUrQxZ++oXpmPUWYtHDylZopW6qfq0VMVNvURU/Qp2tizdVyz7Msvu55cRJGaRXJw6Z3koobLdvJgqbmpelfPGi+lbhWXXEV' +
            'NHL5o7aJ52Hc+bNEHLpoXOmOpdat8kF6uXWVvoQd08Z0+bKf5rr4EL7121Q9QdX25lLL3KLue9IhV9gOWXQ99sq1kjyovmZt/qu3DZ' +
            '+u2X8kgGIeodJ9uDYScq5t74R7nY0/sXZatdAAcTVa+53w8zHzsyfc73/tzL9qv/MH1hiru2v7z+Qjzube675awyr669rAtJwoHXe+' +
            'ryksOH3dO0Qs9xPb6VNN1feBwgb326L3WD+7pqWTnbdj4Env5oXu5N77DheD3xLDxRS2kx11IvfIdz4ffc4OmL2GhP+ZC71+/R5G45' +
            '4fMOtSvw8Mt5DMuyKGyBu032G9uoCdu4P8BRSK2wJu1O88AAAAASUVORK5CYII='}
        />
      )
    }
    return null
  }

  getPrev = () => {
    if (this.state.screen > 1) {
      return (
        <img
          onClick={this.prev}
          className='prevArrow'
          src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ4AAACeCAYAAADDhbN7AAAAAXNSR0IArs4c6QAAIQ5JREFUeAHtX' +
            'Qm0nWV1/e8bMrwkJBAIyJSKI0vUaqu4oAutIhRbxy5ta6lU1FYtuhyKlKLY1rKo2qWtQ7VCsdqWauuiWgdKQaxWUZytZYFakCECCSS' +
            'QOXnT7X/uvftm3/PON/7/f+970W+t9845e+8zfEMCvLw8WsVPz2otka22l8iclcZcKpfh2+TBsAff/lzckn6gS+nSltKsrscyDHxJP' +
            'MjFfJmLebZhPKC6eizKh7jYLnexzVPX5S+WOovmES6Gi14MMyyWhzHMOUb6CEd56aPsHXPBdc030guO2OhI5qvrcCP215eMome/ec9' +
            'ZDDPwTCO5fB6g9Ic6wzAvYJi9cKaj6IneddihPobewEPpOayLOdj61PGocmoM5VGUgzXep+kH0XR9ubwmetRds4mLbKKm/sXQWI+6D' +
            '5gHX+y1m5yPzyHk13G5ddRwzdlI7SYOv4maOJTc2rl56Dtsm3vZuXkx+6u1dt0XUnc9OZCcmjk5fPhV87mW+FUvLSc/J0fPrePaatZ' +
            '5wHXWwoZTaqZoc+ojp06bc5EpOSna2H3VUjPnsqwB66qD2in1YrWxOswwKht7sbE62UeKNmbflevVcRl11MBmU2rFaGM06O2yuTUqX' +
            '045UEyNGA32lqJFjstWqpV7qBiman5qnZh+MRr0hc3JQW6Ozbm0mJwYjcwbqwvtLbtOlQOvkssbiq0T0oV49IzVQS82NSfnQmJzQro' +
            'Qj33F6qB32aw6qQeK5rl5yIeNqePT+Dj0EBvShXiuVYcfuqwQjxl8Oh8Xkw9NjI3pNVAn98Bz89A8Jt+n8XExPWLypU6sDj21jb0Qn' +
            '87HoZ9P4+Ni8qHx2ZgeA/k5B5uTw01j8l0aF476Pj6XQ+06re+icjmZz5XrwnlPMRrWaz8p33cZurDEqXpdI5Tv43M4V44L1/MiTtU' +
            'nXULZxKVPxWVeV06Ii+FF41u+3gN5KQeaoh1o0gtC+S7ehUtZi7Mwl7Y3Wse48lhThx+6HBdv4RaGGV2cCw/lgQ/ZUP1Ofsphp2j1c' +
            'KFcF+/Cpb7mdGxpeC5LD97HQZNifZeRymm9jnkuF+fCkRviobNsVG7sAcfqrEFCuRZvYaitOR2LzsJcuEuLfq485rUfc/iWxsKktoV' +
            'rTMc8k8VZWCiHeZ8fqu28IC4aczGsZ9+X6+JScK3VscwSi7m0vJ+qvutCLDwGi9FgZksrnAsPcajrsr665qXoQtbFaY0V+/JcXCyud' +
            'TqWeTSmY0uj92HlaI0v9h5+mWjxGtOx9NNYKMaMWhfCrV7ICVlXr05e6GBDvKu5L8/FxeBao2OZR2Mcs69nz+V0HYl9hx7LaZ2OrT6' +
            'sYZ9nTMWtPlzP57t6LbgkXcR3GVqL2Jfj4ixcYxyzb/XVvI4lJxZDfVgrTzjnISPRobHyNMYx+yjNGPvC69iF+fAQJ7y1rN4dnesQU' +
            'STEQ8fWlZOCay3H7EtfjtnXXExsaQSrY1mXoLGU2Kf1cdiL1uTiyLOsq8fApelEfYmat2JfjuZ0jHqMsy+8L2aOfZ3n4zADrNYCj7X' +
            'Ogy8LaI5j9qUXxy5f63TMecJhaVzH0In1caxj38zxHayP48LwfXqLC2HMsy/9OHb5KTqtlRiL6wOLseaBl4kWzpjLl54ujvEUndZKL' +
            'EvX66Ldzz6OdfBNvetQXTiKWdaVY+EhjHn2pS/H8GExF8fwYaHRtazYhXENl28duMZ0LLWAwTKGXuBgfRrNcY6uh1jnxOCs0f6CntZ' +
            'lSJIL1wURu/QWHsKYZ5/nYjzkM881tG/FgsnSNbqo+/OCg+5JNc4x+yJHDMuYy2etS6NxiWXpXBfmw4Wz1oLargN14VZRl9bCQxjzI' +
            'Z95mQuxtpgZOGt9PvK05TrMLThcJns+a2J8SYNOW5S3cGCc7/N1LcQ6JwZnDXyep4NZh2hhKGBZl17jOpZajKX4ltbCuEeI572xlnG' +
            'up/EFh0sCi2PM8i1MSgKHDWHM+3zhZHFdK+6IDB1wlx2oax2whbmKubQa17HUYyzFt7TAYLl+CGOt+LI4p4t0P7twaAYOF2BpNe6KG' +
            'YcPK+Xga2txjMX6opOF+t1oYRzCwbMdqGkdpIVxAfYtbQzGmhTf0gLTVubUGGLmtG/FglVZA4deFuLY8oHBSm/4LmtpGIv1tU5iWej' +
            'bjbqfLYx59ge0E8wk+nyJvlSfjrmQD95lZQYXB9zSMCY+FucAg9XcwKFC1LPCab2SdEKfDhysLx8asbKkd8jvCOkT5xC8wI3VmYkMx' +
            'hwQ9JZWYzqWXMbgw4Z46LRFnsYRg2fr8zUnMRbXBCYWl8uYhbPO8n2YcCGee1raGF40sjjfil2Y4Nbq19OHqGMrWTCXTuO+GBwseiF' +
            'u2up9oJ/GO3OdefYhax53+uoTVq1trRtfNrZqcqK9WoiZ2dauuen53bu3tx/8n+t23XbNP+7Y2UkY/NQ/8BIO+eCbsphM1xccmNa44' +
            'hAOHrZfnw9bSB0jQVtLpzFfzJzlA8uxyOH9CObCsbc+f9KTVi577vnrf3HDMeO/tGxlcfL4ZOsRrVaxAUKfbbeLLXMz7R9N7y1u3PK' +
            'TuS9/6p1bv/m/39g7TTn9wy8x+LAiEx8xrAsHn2pRT6ws5Gs/JrY0glmr36d/2D2Vjq1kl0bjvhgcrPSBn2NzcrhncdyjpsZf8Y7Dn' +
            'r7+6IkXLZsqTi+vYqW1+WSsVeyd3lNct/Xu2X+57E3brr/rB3vmqAYuIsfm5Ehr5LFvYRiTOc4BD6t1wNn2NbgwkDoGztbSaMwXg4O' +
            'V2vBzrC/Hx3X29IyXHL72WS+fetmaQ8fPbbXah/NG6/bb7db9Ox+Yu+Jzl+/5u89/9P7tVB8XYlkLk1TBfRw0PmtxjIkvC3260cLY0' +
            'kDLtl8HFyMk+yzWvqXTmCtmHL7LYiYXL7jFWZiuVZzyvLWrX3j+2tesXjt+bnmOa/Qmm41bO3dtn7viX9+5/b03fHL7LuoVeky4OLb' +
            'sSymO4Wvcil0Y4+LL4rpdxMbAse3k4pKEYJ+F7FsajflicLDcF5hla8UuufrY52w4duJPyx0fxZsbut8u7t2yafatF5216d/L3rhMt' +
            'uzLeBJXwVCDLfuozZj4spizYhcmOK9OHVyoEOyzkH1LozFXDByWewKzbArm1T77Dw5bf9a5a94zubz1dN7UqP2Z/e3rr75i52s//f5' +
            'tW8tZcMFi2ZcxgblwaGAtHTi27Osc4WQB70YLY0sDLdtOHVyUEOyzkH2tSYmhhUVPxD7LHPtcg3H2O5oLrzz6KSc8dtkHRv67HJ8m+' +
            '+Xvfrd9f/pVl7747q+VMC6ZrfY5lkoSM8Y+eG2h0bjEspjPiTtF1KdOTVyQcOwrbSe0eI25YuCw3A8YW/ahFSwGX6B5+7XH/k75X6u' +
            'Xll/qGO/sZJF+Kr9kM1f+1++FFzxz0z+UI+LS2WqfY9mVxPhADGtpwYmV5dJ02QO8K+Ya0Gjb6YFLEpJ9LXbxnMO+1oNLsaz1+T6ue' +
            'NeXjn/DmsPGzrc2tFixndvm3/mG0+58V28+/ZD4cYQ4KaE1wGIsa8SXhf7a75CKB8a2k8+XxqTlQwsuNoYOVvLhi2UfnAtjXOdqrvi' +
            'rr2x8S/knDa+Wok2t9SseUzxy3QuL1ZMPKbbuu7m4aduHi/1z/JWSvM7ln4T8zetOveNtvWz9eHD5wH2xlIAOPiznCSZLY4i77AE+N' +
            'oaObZsviwntQ8e4xji2fGA+a3GC4UP6Wz7ndfi//K/jX7n28LGLeeC6/ZPWn1s8+cgLi7HWge+12DNzX3HtXa8o7tv7vcrttt8//2d' +
            '/+LQ7P1gWwsPBI3DF0pM51jMHP8ayRvtW7MIEx2rj33lwcSC0tXjG2JdcxNpqTvMSM6b9mLh1yWePe8Hhx4z/BdWSvrWux63//eLko' +
            'y4qWq2xgbqT46uKEw55VnH37q8We2Y3D3CpwcpVrdNO/tU1t19/5Y5bjFycBShfzBx8WOTDAocFDuvCwUfZ3Ienm7ti4DGWNdqPiTu' +
            'a17znqEc99OeXfaTc/WTUCWSI5NE9+ag/cmaOjy2v6/G1ptaO/fLPnbjiP75+9S75UgvOgXtrzBdrTuoAg+XaMX5W3uAv15g2YQ0Gg' +
            'XVlgIcVnfatGJhYfHR6POn0tVMnPXXFh8r/Oqznz1k7VQc/hR4d1MvGDynO2vjR4oiVjweUZWUvsifZGxXAvp1nUWqhQRq0EsOHhUZ' +
            'b8LCaz47reHihoTSvYxmeMfY1h42KBh/QtM5+27o3j40Xj4Sobhv76NC3rscne5K9lXUX7LmHoSWs7ww1Jzka0zHqwoZ46Jw25uGlN' +
            'PFpmYMPKwNqX2Jg8BHzhjrc6//26MdOHdI6h4k6/dRHh951PT7Zm+yxrIuzQAtY4DgjHYsOHPsWhppsWce45Qe1MQ9PFw4WLROggdU' +
            '1OGYN+9BoTOKBj6mpqeJRJy+7tPzvuZz9oI/T5j46FJTHd+bxf1+snKjwzS/l3mSPstdyDey/F6MdeI41ps9Ua1mforXqmFgjF2V26' +
            'oKuTTAuPj5QCjHrwBUXfOywZ41PFE/sAzU6VR8dRlkxsa544hGvQ5hlZY+yV0eydUYuzCphnq0lrAOr+vBih2UdfNjUfUjewMeG4yZ' +
            'em1okRl/Xo0OvDVNPgJtte3sd2H9ZrMpZyiycz75vzlidWaPqw+OiOYNwjvgcS21g2vb7XvyJo586MVk8rg/U5NT96GSs/bMPVp5O9' +
            'ip7VoX0+SBmmcYkTl05OWaPOh8eGmA4WI0jhrV0GoMWVvjOx5EbJ88GWJdt4tHJbLft+EwtI/b23D+DQFHoWCaYtTSOGNbKycLk4fm' +
            'K+rjYhlwDPqyvhmjwYeqe8duHrVs+NXa6SWaCTT26O3ZcW9zywD9nTjWYJnuWvQ+iAxHOLfacJZm17A8UTgh8NdSf94SrcjH2w5kLF' +
            'ZwvPj4WKg9w0HTsGeesfna73V5mJeRgTT26O3d+ofj8pvNyRjJzZM+y95IcOA+KrTzWghesyuJ89oM1m/hHbbApCaxhLYxSDrirD23' +
            'V9rtdk4/uurteWcy3+W84HthDrpe4d+tMLSx3nOS8YT281E2KHh/mpg47ZuXYspVjJ5tkItjco7u+aOLRyfZk73IGnq3i/HLO3lO2H' +
            'so3eEoHbE5bqwY0Fmdhol/w8ZKL15Z/CFr9b4c1++heVfvvdAcOqL2mewYLz6Z3XgekYc93J+C0DVf1KOp6eK4WGFZ49lkvOD4Y9/p' +
            'HnbBM/vio0lq6j6677YwzwDn77gJn6tKAr2Sbfniu4VybcuEL6qycaj1sAZgALPVHJ1tNPAPX2brwhNNMl47q4cmkoQ17+fKvKD48f' +
            'bvdjIPh0clOJlcUoV983jMsS4T47oE18HmUD8+1HTkMPhCO4bfGJ9rHugr48IPl0ckex8eL40rTP5PevhH3wj6PeFHYYTw8OYjcxbn' +
            'sF2Pjrc6PCUsp3Oyjq/9LJqG9tcZbq5SGz4h9JQuGVXKDxUWQ8vAaHyZqYohaCw4djGmbf3QzZt8mwVYr/Rdfk/OUtaPfSMrD45mjG' +
            '3CSMVhunfIv2bT5W8FVm8Fw3fJHFE868k2DYA3RzNzu4ks/Ob/8ksnwH52Mn3IGxnb12evYSDGhrLzch2dOMEywPV/sj+334P4fFV8' +
            'sH0i7TKpzyd8oO+P4y4vJseR/6tcyRsoZ1NKwxiJNPLzUXwGp+s72y78wyj/eK3gk/7f9qkYen3yPnfylnlE8vtQzoENKPfNUPbWy3' +
            'SYent3JjyZvrPzVvttfciF7sD2+nDMoTyX5rBeeZHVksTw82UnSgczPtu/N2f7B9PgyziDpjHPONzZnMT282Jk7uunp4takBBIfLI+' +
            'vyhnQcYzEXSwPr/zXlf4Pi4k6iH272tkPTxocDI8v4wySzznqMjJETTw82Vzj64HNszdXbbLUH18dZxB5hrXfaRMPL3IvfVnWpj79/' +
            'l3fKr+QFf0llX435SzZx1fuvXMGaj+RYdaZR9aOkuU+vNzBdZ6Oo4YW0U1f3bFvZl/7O9EJHuFSfHyydzkDz7ZClD57HYfywWflpTy' +
            '8rAaYrgm7+8H5L9ZVd6k9vjr3XtcZlnWi30jKw8udL3oYowHnst+RfvOaXZ8sf5rSAtyoEwU1+fjO3Pjh8utF+KlwUeM4RbJn2bsh4' +
            'LNg35B6oSq53sIg5SR8X9vRHMeWD8yyjIlvxcBhMadY1nfim76yd+evvGzdKeWPdsj6FikuDn/b/puLndObio1rnln+KyRags23qye' +
            'PLmbmdxVb9n47v0gvc2Z/ceM7zrnnil6IR8IWfuVeTRUYxu94rtldhyM4Pqxc5HU02+6Z+bglqoI19TvfxjX1/KW43p75jHAmetvQ+' +
            'HidM5R4lA/P2qDrgCxtB7vsjVs/1Z5vbXIKMokmHt/EWPWfFyl7lT1nbCv5bDN6RKc0/fB4sy5fhhWO+egN3PGDfbNb75mVH1Bd+6r' +
            '78d2z++uVZ5S9yp4zC1nnzOfu8jPbudPqfng8uKur1uhY5wnv/bj8wu0fn58v7tKJdcR1Pb5dM3cX37nvryuNJHuUvYbOo8f7eukz1' +
            '7GVG6Ox8kysroenhwrF5jAESj4+CLbdW7+9Y/+mm6f/xGaro1Uf356ZLcXnbj+7mJ63/ufd8fPJHmWvkRk4P30XoXStD8WheiZf18M' +
            'zi0eAelOSYmHBUm/7jbuvnd7Tvi4ozBTkPj55dJ+5/TeLHdM/zuzcTZO9yR4zi1hnamGZ5dPTUr+cIh34awyWD8yyLgw46kvMH4KHV' +
            'mvF1MSND3/i8l+Xn5QeEufwqV9qqevRlf8Ptm3XfmTXS2++ca9886s8mNCHtT3kMFf18XE++9zD9PEVTb54LdQcx5YPDFbqiY+YrcY' +
            'RQ4NZGHf6cjEnnbrqh4c9ZPy51A81arGxj6+uRydfLL7tuzOvvuyCzd9P2AAemfUYNIYYVtqwn9B2QOqrEfV/9rEeATowZ/nAxLIv+' +
            'cAYB6Z54LDCW6v15at23v7UFx0ysXyqVcsP9LGahB5fXY9Oeu+4f/59b3nOpit7c8hlWh892jS+B2AmEIhcWKKquXX+jieT8CNyxVo' +
            'DHXCOXQ8NuGWL//749Fef9lurNpY/beBEKdbEkse3Y/r24thVpxXjYwd+RN+D+28trr7jnMr/Ticz793ZvuqPz7jvrbOzs6GLF54/9' +
            'JbBAdcx4/AtK3m1LFw2rFVUcxyzL7mIU6xoWY/YhYFHP8QD9sjjV0y89aojL5tc0ez/jXv15DHFw9Y+p1hV/pHYtvL/3vijBz9RzNX' +
            'ws/DK7z65/k9fsPkVm+/sfM0OD8Wycg4WjkeiOa1HnGJFKws9tG/FgmFF/d8b8QCQ5IvBaSu5gmlcY8yDg+UawNgu4E94/JoVr//Qo' +
            'e9ZsWrsTCGXytq3e/6ad//eA6+97Xs75dueQg8nlpftQ2v5GkNsWcbEl8WP0Io7ot6nrH/Hk1y5cKyQD54t+1JHYsYQA2MNY4JjIQd' +
            'x8cDm6bkbPr3/c6c+f9URy5a3Kv9Ys37hBp3dO9pXXvy8LW+899Y98rfE8VD4UhmDzxNZmPC6BudonmPO0zmIYzTQdiwuEXaA7AUWx' +
            'xj7koJYW3Aal5ix2NilAz5Q85Krj33pkcdPXljnz0yWDdW1yu+Emd5858ylF5216cNlTblIXCZ8baW1xqwcreMYPizyEVtWMFmWtst' +
            '0PzPPuPhRv+OJEJcovixfDE5bzhNO84xByxh85IlGFvBuNPi5r73+n3Z899hHL/9i+fhOLX/k+NpB2Wij+bnizu9+Ye/vvv3se64pJ' +
            '5ELw6XBZ4thLUw45Godx/BhdQ5wlw3pQ3z/OxP7F+TopHlfzBz8GMsa+BjHimMwye/rvnH17i133DL3sRNPXjFZ/sj+8kfZ9vePPkO' +
            '2rZkdW+cv/9AF28777Ae2/aRsLheGS4MPi9kQQye4xnQMDdfQGDjGuQfzlX1cCqyroMUzxr7UQKyt5jQvMWO5sa9GZ4aXX7LhkU84Y' +
            '+rNy1YWpwkw7DW9t/jSd/5zz59fftGWH5a9ccFs8XhkNPiwGkuJoYXlnoLJ0hjiLnuAZy04FzbA8wUxoX3oGNcYx5YPzGeZ037VWGb' +
            'XNYrz3nvk4x/9lJXnrZgqTi//aAo877M2X/4UYt+e4rpbvrb3fe97zebv9QrrxySwxuqIrbrAfJY57VuxCxMcK+rLKRDrS4mNoYOVe' +
            'vDFsg+OMZ+vOR2H6oEvXnzRERuf8PQVzz9k/fjzxyaKjULUteZnizt2bJ37t29dt++qj1163529uvKYZLGN9bVOx6jrwi1eMFmcw3G' +
            'HJD42ho5tpYcnhXDR2ufY0gCzbAhjXvxQrGdhveY68avefdRjNj5m8pTVh46dsnzl2C+Ud7FGiPjV2rl/7/y3dj0wf8MdN83c8IHX3' +
            '3tTmeu6UMbZl3YSMxYTW3k+DBxb9tFfMFkcs99lB3lg2vYfnhC4EC1CbPEac8XAYbmfYBpHzJZ1IZ/z0MuHQcNWfFmtX3vl+g0nPnn' +
            '5w9ZuaD102YrxtWMT7dXjE92fSDo32949P9vaNb1vbvv2Le0f3/z1/bd+5oNbt5R5+lIQw0pt8RGzZZ91jPt85jhffFnCaw1wywomC' +
            'zndaGFsaaCF7dTAZQjIPkRsLV5jrphx+DHW0jAW42NvrAVmWca0L3Hs4kuyfGCWDWHMu3yZUzjmgfmsxQkmC7W60cLY0kAL26mBbxI' +
            'QEBcDgWUtjcZcMXBY7glMW0sDzKeFhq34WMhFzFZz+rBZ6/KtHGDaSg3BNM6xy0d/Vz7noY9lUcfHoRa0OuZcaJx2mA9PhsClwmpM4' +
            '4jZwte5EstivovYmEurD9Sqh7o+y3VCvvBag5gt+9JbYmCI2Wqf41CeaBtbqQ9PBrEugjH2MTgwbbme5lwx57APPXpaNkaj8/iCNOe' +
            'KdQ7Hlg+MLfvSx4oZY5/1mBE8Yp8NaS3ewpw9mnh40kxfMMfwYVkPLGQ5R3y9dL7mU+OUQ7W0jFk+MJ/N5WSvrlyLs84G+RaXhfHDk' +
            'wK4MF8xl0bjrphxywcWsjyj1locY6k+6sfm6Yvi2PKBwUof8RFb1sKQF2NZIz4W6sbG0MXYfu2chycNrIvQmC9mzvKBxVqeSefgQIA' +
            'jZuvjRNc/ME5y+JZWY4i15V6a45j92BzW+XzhUhfmic6r8+FJU32BvhgcLOcDg/VxrBGdLAvrMn7OlxtzuD4Nc/BhpS98bcFpPBRLX' +
            'sxCHdGyHxPH1Dc1uQ9PilmXqzEd6zzwsMwDg/Vx0MCKVpaOu2j3M3N84Oy79Ixr38pnjH3JRaytj9NaHftyLY4x8VMWeqfkLPi2IL6' +
            'MUCGXVuO+mDnLBwYrM8HX1jcvtC5NiJe8mAN2aTTOMXxY7gVMW58mlhOdb6EnNDoGnmX173hSJOYS0MzSxmCsCfkWD0xbnt/HYX7LI' +
            's/ifIfv46QW8yk+tLBcC5i2loYxn685iV0LfV084wPaJh6eNNOXp2OtYd7yLYw3BZ91wGCZYx+8z6bqBw65V5gx9oXmGL62rPNxlo4' +
            'xny+ctdDP4rKwqg9PmrouReM61rnMh3yLBwar60ssK8R3VYOfUw7epbVwxuDDygSWDwyWdRbGvM8XThbXsOKOyNABj7LWw5NEvpxQI' +
            'ZfWwkMY8yHfxWPeEA8dW85hPMXXF8e5muM45FflZQ5XDczIPLA67IK6dTw8Gcx1YRYewpjP9V15vkPkHOgsDFyMXXDgZRJjLl9qW5y' +
            'FubSxuOhkce0uYmMuLXKibF0PT5q5LknjOsagjLt87uPThGpyHWibsDGXqTUcw4fFjBzDh/VphNM66LV16Vy4zvfGrocnSXyx3iI90' +
            'qfXnI5Rn3GXL1oXl4pbfYHVYV2XZOGMVfFl7ph83h/rdT7rcnxdu1OjzocnBfnieUgLtzBdgzXs5+p4Jl0jhdNaX2wefC+BOfaF9sX' +
            'Msa/zmGO/175jXDhr4KdokWNafZlaFOK1XmJXjoVbmK6hNb6YOfYxJ2PsWzywOq11cYyxj76MuXzRMqdjzVm1fZiuB23Iuvou+JMLX' +
            'ci6HK3RsS/H4ixMamqcY/bRnzGXb2l9WAwHDVvngZciiwthzLOPnoyxL7yOrRwfBq5W6/tHrTTiC0xp7MuzOAuz+mtd1Rh70nWAWzM' +
            'w5/NdFy45Lk7jdceYV9f1zRTiUDPJ+g4chWI00LL15bm4WJx17KO/xnQsOgtDfgzPWp9vXTLrLV5jOpZ8xtjXXKiXTx/iuLb29UwDf' +
            'Oh3PBGHLmigoAp8uS4uFtc6HWMUjevYpQNet3VdiMZ1jDk0HopdeSFceF0bOZWt6xJ04VidzpPYl+viXLhVT2t1jJlScasXasVa38W' +
            '5uFhc63TMM7o4Fy65Po5rW34w13UZVrEUrc735bo4Fy61LU5jOuaZcjmuker7LiOFs7QWhvlcnAuXPB+Hui4blRvzj1o08F0WND4by' +
            'nfxLlx6WVwsxrNaOczX7Ycux+JjMcxq6YVz4aE88LXY1ANP1eshQ/ku3oWjvsVbmOhdOGqxTdFyHvzQJUMn1qW1cAvLrRWTxxqfH5q' +
            'rn5tzsDk5/YalE8r38T5Oerh4F+7LEa7J5bskF+fCMaeP93GSH+LRw2WT8lP+UYuGvkuEJmRjavg0Pk56+3gfx3PH6jjH8mMvxKfzc' +
            'dLTx/s4zBujgbYWm3u4uXk8dGwNn87HoVdIE+JRp24buuwQL/P4ND6O9xKr4xztJ9eocuhVcnnwmDohTYhHv1hdrh55sKkXEqsP6UK' +
            '8zBejwT58NqtO6kXoAarmo15snZAuxKMf25wczs/1cy4slBPiMWusDnqXza5Tx6HXUQMbi60Vo4vRoK9lq+ajZvbl9ArE5MdopFysD' +
            'rP7bKVadR1uXXVkoym1YrWxOt9BD4tLudCmtKG9pvQ1a9V5IXXWkmFT6zWtNw+wBjD1EpvWh7aU2t+sl3pZZhEC664npXNq5uRgG1V' +
            'yUcOyVS4sJzcnx5qbsdpqNnHITdSUzefWzc3jAx+Fn3vJuXmhPdZat6lLaaouDqdq/ar5mKMuW/VSq+aH9lF7/aYvYKnVb3reui+w7' +
            'nr6ATZWv+mDlo0Mo8cw++jLGXbc2GNQG2m0z7AexSgexjD3pu6s1rDRB2BMOpR+o7icUfTk8x11f56F/aFcODdU/lD7j/ISRtlbnXk' +
            '/bHqmoV5uf1d+ZyQzNX3Q/i132cUwQ8ycB5tmJA8Oh7iYLn0xzYLzORjtSB8cDnSxXvZinQvnttTsonhsfGhL5YKXypx8tqP0F91D0' +
            '4ex1C90qc+v7yM1XvQPzLWhn4aLW6p7XLKPyvXYfob/7ARGfgL/D9XHDc2yqR9vAAAAAElFTkSuQmCC'
          }
        />
      )
    }
    return null
  }

  fail = () => {
    const { failSound } = this.refs
    const { sound } = this.props
    if (sound) {
      failSound.pause()
      failSound.currentTime = 0
      failSound.play()
    }
  }

  ok = () => {
    const { okSound } = this.refs
    const { sound } = this.props
    if (sound) {
      okSound.pause()
      okSound.currentTime = 0
      okSound.play()
    }
  }

  render = () => {
    const { gameDetails, correctElements } = this.props
    const windowSize = window.innerWidth * 90 / 100

    if (gameDetails && this.state.screens > 0) {
      if (correctElements) {
        correctElements.map(element => {
          $(element.object).addClass('hidden')
        })
      }
      let categories = []
      gameDetails.forEach(detail => {
        if (categories.indexOf(detail.category) === -1) {
          categories.push(detail.category)
        }
      })
      let left = (((window.innerWidth * 94 / 100) * (this.state.screen - 1)) * -1)
      if (this.state.screen > 1) {
        left = left + ((windowSize / 6) - (windowSize * 2 / 100)) * 2
      }
      return (
        <div>
          <audio ref='okSound' src='http://pasitoapaso.themonstera.com/ok.mp3' preload='auto' />
          <audio ref='failSound' src='http://pasitoapaso.themonstera.com/fail.mp3' preload='auto' />
          <div className='sortPart'>
            {categories.map((category, index) => {
              let elements = []
              if (correctElements) {
                correctElements.map(element => {
                  if (element.category === category) {
                    elements.push(element.object)
                  }
                })
              }
              return (
                <AgrupandoCard
                  title={category}
                  key={'agrupandoCard-' + index}
                  noHeight={(((windowSize / 6) - (windowSize * 2 / 100))) / 82 * 100}
                  fail={this.fail}
                  ok={this.ok}
                  elements={elements}
                  gameDetails={gameDetails}
                />
              )
            })}
          </div>
          <div className='bottomContainer'>
            <div
              className='agrupandoContainerScroll'
              style={{
                width: (window.innerWidth * 94 / 100),
                marginLeft: '3%',
                height: (((windowSize / 6) - (windowSize * 2 / 100))) / 82 * 100
              }}
            >
              {this.getPrev()}
              <div
                className='agrupandoCards'
                style={{
                  width: (((windowSize / 6) + (windowSize * 2 / 100)) * gameDetails.length) + 80,
                  left: left
                }}
              >
                {gameDetails.map((card, index) => {
                  return (
                    <div className='pull-left cardCircuitContainer' key={'CircuitDraggableCard-' + index}>
                      <AgrupandoDraggableCard
                        width={(windowSize / 6) - (windowSize * 2 / 100)}
                        card={card}
                      />
                      <div
                        className='space'
                        style={{
                          width: ((windowSize / 6) - (windowSize * 2 / 100)) - 40,
                          height: ((((windowSize / 6) - (windowSize * 2 / 100))) / 82 * 100) - 40
                        }}
                      >
                      </div>
                    </div>
                  )
                })}
              </div>
              {this.getNext()}
            </div>
          </div>
        </div>
      )
    } else {
      return <Loading />
    }
  }
}

Agrupando.propTypes = {
  dispatch: PropTypes.func,
  gameDetails: PropTypes.array,
  sound: PropTypes.bool,
  correctElements: PropTypes.array,
  elementsEdited: PropTypes.number
}

function mapStateToProps (state) {
  return {
    gameDetails: state.Game.gameDetails,
    sound: state.Game.sound,
    correctElements: state.Agrupando.elements,
    elementsEdited: state.Agrupando.elementsTimeStamp
  }
}

export default connect(mapStateToProps)(Agrupando)
