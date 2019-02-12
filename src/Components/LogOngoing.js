import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { propModel as entryModel } from 'models/log'
import { connect } from 'react-redux'
import { selectOngoingEntries } from 'selectors/log'
import Entry from 'Components/Entry'
import SectionHeader from 'Components/SectionHeader'

const Table = styled.table`
  width: 100%;
  border-collapse: seperate;
  border-spacing: 0 1.3rem;
`

const LogOngoing = ({ entries }) => entries.length > 0 ? (
  <React.Fragment>
    <SectionHeader>Ongoing</SectionHeader>
    <Table>
      <tbody>
        {entries.map(entry => (
          <Entry key={entry.id} entry={entry} ongoing />
        ))}
      </tbody>
    </Table>
  </React.Fragment>
) : null

LogOngoing.propTypes = {
  entries: PropTypes.arrayOf(entryModel)
}

export default connect(
  state => ({
    entries: selectOngoingEntries(state)
  })
)(LogOngoing)
