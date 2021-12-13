import { CHANGE_SIDEBAR } from '../actionTypes';

export const changeSidebar = (event) => ({
  type: CHANGE_SIDEBAR,
  payload: event,
});
