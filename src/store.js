import { createStore, combineReducers, applyMiddleware } from 'redux'
import logReducer from 'reducers/log'
import themeReducer from 'reducers/theme'
import thunk from 'redux-thunk'

export const store = createStore(
  combineReducers({
    theme: themeReducer,
    log: logReducer
  }),
  {},
  applyMiddleware(thunk)
)
