import { CHANGE_THEME } from '../actionTypes';

const defaultState = {
  ModeColor: '#fff',
  LoaderColor: 'rgba(255, 255, 255,0.8)',
  ModeTextColor: '#000',
  ModeDropColor: '#000',
  mode: 'light',
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      localStorage.setItem('theme', action.payload);
      if (action.payload === 'dark') {
        return {
          ModeColor: '#010409',
          LoaderColor: 'rgba(1, 4, 9,0.8)',
          ModeTextColor: '#aaaaaa',
          ModeDropColor: '#fff',
          mode: 'dark',
        };
      }
      return {
        ModeColor: '#fff',
        LoaderColor: 'rgba(255, 255, 255,0.8)',
        ModeTextColor: '#000',
        ModeDropColor: '#000',
        mode: 'light',
      };
    default:
      return state;
  }
};

export default reducer;
