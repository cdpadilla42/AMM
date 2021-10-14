import { createAction } from '@reduxjs/toolkit';

const initialState = {
  current: 5,
  showingHealthBar: false,
};

export const loseHealth = createAction('LOSE_HEALTH');
export const fullRecovery = createAction('FULL_RECOVERY');
export const showHealthBar = createAction('SHOW_HEALTH_BAR');
export const hideHealthBar = createAction('HIDE_HEALTH_BAR');

// Reducer

function healthReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case loseHealth.toString():
      let damage = payload || 1;
      return {
        ...state,
        current: state.current - damage,
      };
    case fullRecovery.toString():
      return {
        ...state,
        current: 5,
      };
    case showHealthBar.toString():
      return {
        ...state,
        showingHealthBar: true,
      };
    case hideHealthBar.toString():
      return {
        ...state,
        showingHealthBar: false,
      };
    default:
      return state;
  }
}

export default healthReducer;
