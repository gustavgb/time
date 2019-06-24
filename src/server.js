import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom/server'
import express from 'express'
import { ServerStyleSheet } from 'styled-components'
import { beginPreloading, applyPreloading } from 'utils/fetch'
import path from 'path'

import App from 'App'

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.urlencoded({ extended: true }))

app.get('/api/test', (req, res) => {
  setTimeout(() => {
    res.json({
      name: 'Gustav Burchardt',
      bio: 'I like to create stuff'
    })
  }, 1000)
})

const buildHMTL = (app = '', preload = '', styles = '') => `
  <html>
    <head>
      <title>React app</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${styles}
    </head>
    <body>
      ${preload}
      <div id="root">${app}</div>
      <script type="text/javascript" src="./bundle.js"></script>
    </body>
  </html>
`

app.use(express.static('./dist'))

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/favicon.ico'))
})

app.get('/*', async (req, res) => {
  const options = {
    preload: req.query.preload !== 'false'
  }

  console.log(req.query, options)

  const sheet = new ServerStyleSheet()
  try {
    if (options.preload) {
      console.log('Begin preload')
      beginPreloading()
      const [app, preload] = await applyPreloading(ReactDOM.renderToString(sheet.collectStyles(<App />)))
      const styleEl = sheet.getStyleTags()
      res.send(buildHMTL(app, preload, styleEl))
    } else {
      res.send(buildHMTL())
    }
  } catch (e) {
    console.error(e)
    res.status(500).send()
  } finally {
    sheet.seal()
  }
})

app.listen(PORT, () => console.log('Listening on port ' + PORT))
