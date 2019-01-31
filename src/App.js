import React, { Component } from 'react'
import ThemeContext from 'theme-context'
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

    this.state = ThemeContext.getState()
  }

  componentDidMount () {
    this.subscriber = ThemeContext.subscribe(state => this.setState(state))
  }

  componentwillUnmount () {
    ThemeContext.unsubscribe(this.subscriber)
  }

  render () {
    return (
      <ThemeContext.Provider value={this.state}>
        <ThemeProvider theme={this.state.theme}>
          <Page>
            <GlobalStyle />
            <Toolbar />
            <Timeline />
          </Page>
        </ThemeProvider>
      </ThemeContext.Provider>
    )
  }
}

export default App
