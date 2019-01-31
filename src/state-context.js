import createContext from 'createContext'

const defaultState = {
  entries: []
}

const StateContext = createContext(
  (state = { ...defaultState }, action) => {
    switch (action.type) {
      default:
        return state
    }
  }
)

export default StateContext
