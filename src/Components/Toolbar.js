import React from 'react'
import styled from 'styled-components'
import { ThemeContext } from './../theme-context'

const Button = styled.button`
  ${props => props.theme.lightTransition}
  background-color: ${props => props.theme.foreground};
  border: 0 solid ${props => props.theme.border};
  border-width: 0 0 2px 0;
  padding: 10px 20px;
  outline: none;
  color: ${props => props.theme.textColor};
`

const Wrapper = styled.div`
  ${props => props.theme.lightTransition};
  background-color: ${props => props.theme.background};
  padding: 25px 0 5px;
`

const Container = styled.div`
  margin: 0 auto;
  width: 1000px;
`

const Toolbar = () => (
  <Wrapper>
    <Container>
      <ThemeContext.Consumer>
        {({ toggleLight }) => (
          <Button onClick={toggleLight}>Toggle</Button>
        )}
      </ThemeContext.Consumer>
    </Container>
  </Wrapper>
)

export default Toolbar
