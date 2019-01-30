import React from 'react'
import { css } from 'styled-components'

const commonTheme = {
  lightTransition: css`
    transition: all 0.5s linear;
  `
}

export const themes = {
  light: {
    ...commonTheme,
    textColor: 'black',
    background: '#eee',
    foreground: 'white',
    border: '#bbb'
  },
  dark: {
    ...commonTheme,
    textColor: 'white',
    background: '#333',
    foreground: '#777',
    border: '#555'
  }
}

export const ThemeContext = React.createContext({
  theme: themes.light,
  toggleLight: () => null
})
