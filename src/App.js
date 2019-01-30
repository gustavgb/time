import React, { Component } from 'react'
import { themes, ThemeContext } from 'theme-context'
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

    const hour = new Date().getHours()
    const isNight = hour < 8 || hour > 18

    this.state = {
      theme: isNight ? themes.dark : themes.light,
      toggleLight: this.toggleLight.bind(this)
    }
  }

  toggleLight () {
    this.setState({
      theme: this.state.theme === themes.light ? themes.dark : themes.light
    })
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
