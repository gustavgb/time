import createStore from 'createStore'

const defaultState = {
  entries: []
}

const timeStore = createStore(
  (state = { ...defaultState }, action) => {
    switch (action.type) {
      default:
        return state
    }
  }
)

export default timeStore
