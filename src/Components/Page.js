import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  ${props => props.theme.lightTransition}
  background-color: ${props => props.theme.background};
  min-width: 100%;
  min-height: 100vh;
`

const Container = styled.div`
  ${props => props.theme.lightTransition}
  color: ${props => props.theme.textColor};
  margin: 0 auto;
  ${props => props.theme.width}
  padding: 0 2rem 50px;
`

const Page = ({ children }) => (
  <Wrapper>
    <Container>
      {children}
    </Container>
  </Wrapper>
)

export default Page
