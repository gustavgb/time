import React from 'react'
import styled from 'styled-components'

const Note = styled.div`
  ${props => props.theme.lightTransition}
  width: 100%;
  height: 300px;
  border-bottom: 3px solid ${props => props.theme.border};
  background-color: ${props => props.theme.foreground};
  margin: 20px 0;
`

const Timeline = () => [...new Array(3)].map((val, i) => (
  <Note key={i} />
))

export default Timeline
