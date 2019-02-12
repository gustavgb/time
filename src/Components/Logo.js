import styled from 'styled-components'

const Logo = styled.h1`
  ${props => props.theme.lightTransition}
  color: ${props => props.theme.textColor};
  font-family: ${props => props.theme.fontFamily};
  float: left;
  margin: 0;
  padding: 0;
  font-size: 2.5rem;
  line-height: 3rem;
`

export default Logo
