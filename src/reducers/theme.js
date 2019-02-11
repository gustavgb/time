import { stateModels as themes } from 'models/theme'

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
