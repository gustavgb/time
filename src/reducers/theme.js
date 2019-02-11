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
  `,
  fontSmall: '1rem',
  fontMedium: '1.3rem',
  fontFamily: 'Sarabun, sans-serif'
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

const reducer = (state, action) => {
  switch (action.type) {
    case 'THEME_TOGGLE_LIGHT':
      return state.isDark ? themes.light : themes.dark
    default: {
      if (state === undefined) {
        const hour = new Date().getHours()
        const isNight = hour < 8 || hour > 18
        return isNight ? themes.dark : themes.light
      }
      return state
    }
  }
}

export default reducer
