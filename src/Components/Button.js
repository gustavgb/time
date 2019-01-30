import styled from 'styled-components'

const Button = styled.button`
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
  cursor: pointer;
`

export default Button
