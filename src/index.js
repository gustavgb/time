import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import App from 'App'
import { hydrate } from 'utils/fetch'

hydrate()

ReactDOM.hydrate(
  <App />,
  document.getElementById('root')
)
