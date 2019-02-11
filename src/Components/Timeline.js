import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { propModel as entryModel } from 'models/log'
import { connect } from 'react-redux'
import { selectEntries } from 'selectors/log'
import Entry from 'Components/Entry'

const Table = styled.table`
  width: 100%;
  border-collapse: seperate;
  border-spacing: 0 1.3rem;
`

const Timeline = ({ entries }) => (
  <Table>
    <tbody>
      {entries.map(entry => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </tbody>
  </Table>
)

Timeline.propTypes = {
  entries: PropTypes.arrayOf(entryModel)
}

export default connect(
  state => ({
    entries: selectEntries(state)
  })
)(Timeline)
