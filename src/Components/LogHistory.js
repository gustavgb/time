import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { propModel as entryModel } from 'models/log'
import { connect } from 'react-redux'
import { selectHistoryEntries } from 'selectors/log'
import Entry from 'Components/Entry'
import SectionHeader from 'Components/SectionHeader'
import { saveEntry, changeEntryField } from 'actions/log'

const Table = styled.table`
  width: 100%;
  border-collapse: seperate;
  border-spacing: 0 1.3rem;
`

const LogHistory = ({ entries, onSaveEntry, onChangeEntryField }) => entries.length > 0 ? (
  <React.Fragment>
    <SectionHeader>Previous entries</SectionHeader>
    <Table>
      <tbody>
        {entries.map(entry => (
          <Entry
            key={entry.id}
            entry={entry}
            onSave={onSaveEntry}
            onChangeField={onChangeEntryField}
          />
        ))}
      </tbody>
    </Table>
  </React.Fragment>
) : null

LogHistory.propTypes = {
  entries: PropTypes.arrayOf(entryModel),
  onSaveEntry: PropTypes.func,
  onChangeEntryField: PropTypes.func
}

export default connect(
  state => ({
    entries: selectHistoryEntries(state)
  }),
  dispatch => ({
    onSaveEntry: (id) => dispatch(saveEntry(id)),
    onChangeEntryField: (id, type, value) => dispatch(changeEntryField(id, type, value))
  })
)(LogHistory)
