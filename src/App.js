import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import Page from 'Components/Page'
import Timeline from 'Components/Timeline'
import Toolbar from 'Components/Toolbar'
import { connect } from 'react-redux'
import { propModel as themeModel } from 'models/theme'

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

const App = ({ theme }) => (
  <ThemeProvider theme={theme}>
    <Page>
      <GlobalStyle />
      <Toolbar />
      <Timeline />
    </Page>
  </ThemeProvider>
)

App.propTypes = {
  theme: themeModel
}

export default connect(
  state => ({
    theme: state.theme
  })
)(App)
