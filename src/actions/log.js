export const addEntry = (project) => ({
  type: 'LOG_ADD_ENTRY',
  payload: {
    project
  }
})

export const endEntry = (id) => ({
  type: 'LOG_END_ENTRY',
  payload: {
    id
  }
})

export const changeEntryField = (id, field, value) => ({
  type: 'LOG_CHANGE_ENTRY_FIELD',
  payload: {
    id,
    field,
    value
  }
})

export const saveEntry = (id) => ({
  type: 'LOG_SAVE_ENTRY',
  payload: {
    id
  }
})
