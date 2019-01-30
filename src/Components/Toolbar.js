import React from 'react'
import styled from 'styled-components'
import { ThemeContext } from 'theme-context'
import Icon from 'Components/Icon'
import Button from 'Components/Button'

const Wrapper = styled.div`
  ${props => props.theme.lightTransition};
  background-color: ${props => props.theme.background};
  padding: 25px 0 5px;
`

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  ${props => props.theme.clearfix}
`

const Logo = styled.h1`
  font-family: 'Sarabun', sans-serif;
  float: left;
  margin: 0;
  padding: 0;
  font-size: 2.5rem;
  line-height: 3rem;
`

const Toolbar = () => (
  <Wrapper>
    <Container>
      <Logo>TimeBaby</Logo>
      <ThemeContext.Consumer>
        {({ toggleLight, theme }) => (
          <Button onClick={toggleLight} float='right' margin='0 0 0 1rem'>
            <Icon glyph={theme.isDark ? 'moon' : 'sun'} width='1rem' height='1rem' />
          </Button>
        )}
      </ThemeContext.Consumer>
      <Button type='cta-a' float='right'>Start time</Button>
    </Container>
  </Wrapper>
)

export default Toolbar
