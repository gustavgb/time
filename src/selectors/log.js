export const selectEntries = (state) => {
  const entries = [...state.log.entries].sort((a, b) => {
    if (a.start > b.start) return -1
    else if (a.start < b.start) return 1
    else return 0
  })

  return entries
}
