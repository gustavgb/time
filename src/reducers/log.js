import uuid from 'uuid/v4'

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
          start: Date.now(),
          project: action.payload.project || null
        }])
      }
    default:
      return state
  }
}

export default reducer
