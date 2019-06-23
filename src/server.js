import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom/server'
import express from 'express'
import { ServerStyleSheet } from 'styled-components'
import { applyPreloading } from 'utils/fetch'

import App from 'App'

const PORT = process.env.PORT || 3000
const app = express()

app.get('/api/test', (req, res) => {
  res.json({
    name: 'Gustav Burchardt',
    bio: 'I like to create stuff'
  })
})

const buildHMTL = (app, styles) => `
  <html>
    <head>
      <title>React app</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${styles}
    </head>
    <body>
      <div id="root">${app}</div>
      <script type="text/javascript" src="./bundle.js"></script>
    </body>
  </html>
`

app.use(express.static('./dist'))

app.get('/*', async (req, res) => {
  const sheet = new ServerStyleSheet()
  try {
    let app = await applyPreloading(ReactDOM.renderToString(sheet.collectStyles(<App />)))
    const styleEl = sheet.getStyleTags()

    res.send(buildHMTL(app, styleEl))
  } catch (e) {
    console.error(e)
  } finally {
    sheet.seal()
  }
})

app.listen(PORT, () => console.log('Listening on port ' + PORT))
