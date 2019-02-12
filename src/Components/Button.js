import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ButtonStyle = styled.button`
  ${props => props.theme.lightTransition}
  background-color: ${props => {
    switch (props.type) {
      case 'cta-a':
        return props.theme.ctaColors.a
      default:
        return props.theme.foreground
    }
  }};
  border: 0 solid ${props => props.theme.border};
  border-width: 0 0 2px 0;
  padding: 0.8rem 1.4rem;
  outline: none;
  color: ${props => props.theme.textColor};
  border-radius: 5px;
  float: ${props => props.float || 'left'};
  font-size: 1.4rem;
  margin: ${props => props.margin || '0'};
  line-height: 1.4rem;
  cursor: ${props => props.frozen ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.frozen ? '0.2' : '1'};
`

class Button extends Component {
  constructor (props) {
    super(props)

    this.state = {
      frozen: false
    }
  }

  handleMouseLeave () {
    this.setState({
      frozen: false
    })
  }

  handleFreeze () {
    this.setState({
      frozen: true
    })
  }

  handleClick () {
    const { onClick, freeze } = this.props

    if (onClick) {
      onClick()
    }
    if (freeze) {
      this.handleFreeze()
    }
  }

  render () {
    const { children, type, float, margin } = this.props
    const { frozen } = this.state

    return (
      <ButtonStyle
        onClick={frozen ? null : this.handleClick.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        type={type}
        float={float}
        frozen={frozen}
        margin={margin}
      >{children}</ButtonStyle>
    )
  }
}

Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  freeze: PropTypes.bool,
  type: PropTypes.string,
  float: PropTypes.string,
  margin: PropTypes.string
}

export default Button
