import React, { Component } from 'react';
import './App.css';
import { themes, ThemeContext } from './theme-context'
import { ThemeProvider } from 'styled-components'
import Page from './Components/Page'
import Timeline from './Components/Timeline'
import Toolbar from './Components/Toolbar'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      theme: themes.light,
      toggleLight: this.toggleLight.bind(this)
    }
  }

  toggleLight () {
    this.setState({
      theme: this.state.theme === themes.light ? themes.dark : themes.light
    })
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        <ThemeProvider theme={this.state.theme}>
          <Page>
            <Toolbar />
            <Timeline />
          </Page>
        </ThemeProvider>
      </ThemeContext.Provider>
    );
  }
}

export default App;
