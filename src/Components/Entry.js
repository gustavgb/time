import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { propModel as entryModel } from 'models/log'
import { formatDate } from 'utils/date'

const Row = styled.tr`
  ${props => props.theme.lightTransition}
  width: 100%;
  min-height: 10rem;
  border-bottom: 3px solid ${props => props.theme.border};
  background-color: ${props => props.theme.foreground};
`

const Cell = styled.td`
  ${props => props.theme.lightTransition}
  color: ${props => props.theme.textColor};
  padding: 2rem;
  font-size: ${props => props.theme.fontSmall};
  font-family: ${props => props.theme.fontFamily};

  &:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  &:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`

const CellBody = styled.div`
  font-size: ${props => props.theme.fontMedium};
`

const Entry = ({ entry, ongoing }) => (
  <Row>
    <Cell>
      Start:
      <CellBody>{formatDate(entry.start)}</CellBody>
    </Cell>
    {!ongoing && (
      <Cell>
        End:
        <CellBody>{formatDate(entry.end)}</CellBody>
      </Cell>
    )}
    {entry.project && (
      <Cell>
        Project:
        <CellBody>{entry.project}</CellBody>
      </Cell>
    )}
  </Row>
)

Entry.propTypes = {
  entry: entryModel,
  ongoing: PropTypes.bool
}

export default Entry
