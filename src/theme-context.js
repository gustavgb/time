import createContext from 'createContext'
import { css } from 'styled-components'

const commonTheme = {
  lightTransition: css`
    transition: all 0.5s linear;
  `,
  width: css`
    width: 800px;

    @media (max-width: 800px) {
      width: auto;
    }
  `,
  clearfix: css`
    &:after {
      clear: both;
      content: "";
      display: table;
    }
  `
}

const themes = {
  light: {
    ...commonTheme,
    isDark: false,
    textColor: 'black',
    background: '#ededed',
    foreground: 'white',
    border: '#bbb',
    ctaColors: {
      a: '#00fc50'
    }
  },
  dark: {
    ...commonTheme,
    isDark: true,
    textColor: 'white',
    background: '#333',
    foreground: '#777',
    border: '#555',
    ctaColors: {
      a: '#00c030'
    }
  }
}

const hour = new Date().getHours()
const isNight = hour < 8 || hour > 18
const defaultState = {
  theme: isNight ? themes.dark : themes.light
}

const ThemeContext = createContext(
  (state = { ...defaultState }, action) => {
    switch (action.type) {
      case 'TOGGLE_LIGHT':
        return {
          ...state,
          theme: state.theme.isDark ? themes.light : themes.dark
        }
      default:
        return state
    }
  }
)

export default ThemeContext
