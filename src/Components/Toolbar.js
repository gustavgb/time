import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Icon from 'Components/Icon'
import Button from 'Components/Button'
import { connect } from 'react-redux'
import { toggleLight } from 'actions/theme'
import { propModel as themeModel } from 'models/theme'

const Wrapper = styled.div`
  ${props => props.theme.lightTransition}
  background-color: ${props => props.theme.background};
  padding: 25px 0 5px;
`

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  ${props => props.theme.clearfix}
`

const Logo = styled.h1`
  ${props => props.theme.lightTransition}
  color: ${props => props.theme.textColor};
  font-family: 'Sarabun', sans-serif;
  float: left;
  margin: 0;
  padding: 0;
  font-size: 2.5rem;
  line-height: 3rem;
`

const Toolbar = ({ onToggleLight, theme }) => (
  <Wrapper>
    <Container>
      <Logo>TimeBaby</Logo>
      <Button onClick={onToggleLight} float='right' margin='0 0 0 1rem'>
        <Icon glyph={theme.isDark ? 'moon' : 'sun'} width='1rem' height='1rem' />
      </Button>
      <Button type='cta-a' float='right'>Start time</Button>
    </Container>
  </Wrapper>
)

Toolbar.propTypes = {
  theme: themeModel,
  onToggleLight: PropTypes.func
}

export default connect(
  state => ({
    theme: state.theme
  }),
  dispatch => ({
    onToggleLight: () => dispatch(toggleLight())
  })
)(Toolbar)
