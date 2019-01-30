import React from 'react'
import styled from 'styled-components'

const Entry = styled.div`
  ${props => props.theme.lightTransition}
  width: 100%;
  min-height: 10rem;
  border-bottom: 3px solid ${props => props.theme.border};
  background-color: ${props => props.theme.foreground};
  margin: 2rem 0;
  border-radius: 5px;
`

const Timeline = () => [...new Array(3)].map((val, i) => (
  <Entry key={i} />
))

export default Timeline
