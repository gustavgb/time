import React, { Component } from 'react'
import themeStore from 'themeStore'
import timeStore from 'timeStore'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import Page from 'Components/Page'
import Timeline from 'Components/Timeline'
import Toolbar from 'Components/Toolbar'

const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
  }

  body {
    font-size: 62.5%;
  }

  * {
    box-sizing: border-box;
  }
`

class App extends Component {
  constructor (props) {
    super(props)

    themeStore.init(this)
  }

  render () {
    return (
      <timeStore.Provider>
        <themeStore.Provider>
          <themeStore.Consumer>
            {({ theme }) => (
              <ThemeProvider theme={theme}>
                <Page>
                  <GlobalStyle />
                  <Toolbar />
                  <Timeline />
                </Page>
              </ThemeProvider>
            )}
          </themeStore.Consumer>
        </themeStore.Provider>
      </timeStore.Provider>
    )
  }
}

export default App
