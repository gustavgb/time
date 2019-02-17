import uuid from 'uuid/v4'
import { getCurrentTime } from 'utils/date'

const defaultState = {
  entries: [],
  status: 'ready'
}

const defaultEntry = {
  start: 0,
  end: null,
  project: null
}

const reducer = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case 'LOG_ADD_ENTRY':
      return {
        ...state,
        entries: [].concat(state.entries).concat([{
          ...defaultEntry,
          id: uuid(),
          start: getCurrentTime(),
          project: action.payload.project || null
        }])
      }
    case 'LOG_END_ENTRY':
      return {
        ...state,
        entries: state.entries.map(entry => entry.id === action.payload.id ? ({
          ...entry,
          end: getCurrentTime()
        }) : entry)
      }
    case 'LOG_CHANGE_ENTRY_FIELD':
      return {
        ...state,
        entries: state.entries.map(entry => entry.id === action.payload.id ? ({
          ...entry,
          [action.payload.field]: action.payload.value
        }) : entry)
      }
    default:
      return state
  }
}

export default reducer
