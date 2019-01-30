import styled from 'styled-components'

const Icon = styled.img.attrs(props => ({
  src: require(`svg/${props.glyph}.svg`),
  alt: props.alt || 'Icon'
}))`
  width: ${props => props.width || '2rem'};
  height: ${props => props.height || '2rem'};
`

export default Icon
