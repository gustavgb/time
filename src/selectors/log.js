export const selectAllEntries = (state) => {
  const entries = [...state.log.entries].sort((a, b) => {
    if (a.start > b.start) return -1
    else if (a.start < b.start) return 1
    else return 0
  })

  return entries
}

export const selectHistoryEntries = (state) => {
  const entries = selectAllEntries(state)
  return entries.filter(entry => entry.end !== null)
}

export const selectOngoingEntries = (state) => {
  const entries = selectAllEntries(state)
  return entries.filter(entry => entry.end === null)
}
