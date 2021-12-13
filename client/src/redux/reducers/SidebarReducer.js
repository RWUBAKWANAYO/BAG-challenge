import { CHANGE_SIDEBAR } from '../actionTypes';

const defaultState = { transform: '', };
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_SIDEBAR:
      if (action.payload === 'active') {
        return { transform: 'translateX(0%)', };
      }
      return { transform: '', };

    default:
      return state;
  }
};

export default reducer;
