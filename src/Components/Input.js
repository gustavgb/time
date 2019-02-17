import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const InputText = styled.input.attrs({
  type: 'text'
})`

`

class Input extends Component {
  componentDidMount () {
    if (this.input && this.props.focusOnMount) {
      this.input.focus()
    }
  }

  handleKeyDown (e) {
    const { onEnter } = this.props
    if (e.keyCode === 13 && typeof onEnter === 'function') {
      onEnter()
    }
  }

  render () {
    const { value, type, onChange, onBlur } = this.props
    switch (type) {
      case 'text':
      default:
        return (
          <InputText onKeyDown={this.handleKeyDown.bind(this)} onChange={({ target: { value } }) => onChange(value)} onBlur={onBlur} value={value} ref={el => { this.input = el }} />
        )
    }
  }
}

Input.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
  focusOnMount: PropTypes.bool,
  onEnter: PropTypes.func
}

export default Input
