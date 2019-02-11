import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import logReducer from 'reducers/log'
import themeReducer from 'reducers/theme'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = window.store = createStore(
  combineReducers({
    theme: themeReducer,
    log: logReducer
  }),
  {},
  composeEnhancers(
    applyMiddleware(thunk)
  )
)
