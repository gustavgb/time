import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { propModel as entryModel } from 'models/log'
import { formatDate, getEditableDate, getIsoDate, getDiffTime } from 'utils/date'
import Button from 'Components/Button'
import Input from 'Components/Input'

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
  &,
  & > button {
    font-size: ${props => props.theme.fontMedium};
  }
`

class Entry extends Component {
  constructor (props) {
    super(props)

    this.state = {
      editing: false,
      editType: null,
      editValue: ''
    }
  }

  handleEdit (type) {
    const { entry } = this.props

    this.setState({
      editing: true,
      editType: type,
      editValue: getEditableDate(entry[type])
    })
  }

  handleChange (value) {
    this.setState({
      editValue: value
    })
  }

  handleSave () {
    const { onChangeField, onSave, entry } = this.props
    const { editType, editValue } = this.state

    onChangeField(entry.id, editType, getIsoDate(editValue))
    onSave(entry.id)
    this.setState({
      editing: false,
      editType: null,
      editValue: ''
    })
  }

  render () {
    const { entry, ongoing, onEnd } = this.props
    const { editing, editType, editValue } = this.state
    const onCloseEdit = this.handleSave.bind(this)

    return (
      <Row>
        <Cell>
          Start:
          <CellBody>
            {(editing && editType === 'start') ? (
              <Input type='text' focusOnMount value={editValue} onChange={this.handleChange.bind(this)} onEnter={onCloseEdit} onBlur={onCloseEdit} />
            ) : (
              <Button type='unstyled' onClick={() => this.handleEdit('start')}>{formatDate(entry.start)}</Button>
            )}
          </CellBody>
        </Cell>
        {!ongoing && (
          <React.Fragment>
            <Cell>
              End:
              <CellBody>
                {(editing && editType === 'end') ? (
                  <Input type='text' focusOnMount value={editValue} onChange={this.handleChange.bind(this)} onEnter={onCloseEdit} onBlur={onCloseEdit} />
                ) : (
                  <Button type='unstyled' onClick={() => this.handleEdit('end')}>{formatDate(entry.end)}</Button>
                )}
              </CellBody>
            </Cell>
            <Cell>
              Time:
              <CellBody>
                {getDiffTime(entry.start, entry.end)}
              </CellBody>
            </Cell>
          </React.Fragment>
        )}
        {entry.project && (
          <Cell>
            Project:
            <CellBody>{entry.project}</CellBody>
          </Cell>
        )}
        {ongoing && (
          <Cell>
            <Button type='cta-b' float='right' onClick={onEnd}>End time</Button>
          </Cell>
        )}
      </Row>
    )
  }
}

Entry.propTypes = {
  entry: entryModel,
  ongoing: PropTypes.bool,
  onEnd: PropTypes.func,
  onChangeField: PropTypes.func,
  onSave: PropTypes.func
}

export default Entry
