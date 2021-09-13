import { createAction } from '@reduxjs/toolkit';

const initialState = {
  showSNotes: false,
};

export const toggleSNotes = createAction('TOGGLE_SNOTES');
export const closeSNotes = createAction('CLOSE_SNOTES');

// Reducer

function notepadReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case toggleSNotes.toString():
      return {
        ...state,
        showSNotes: !state.showSNotes,
      };
    case closeSNotes.toString():
      return {
        ...state,
        showSNotes: false,
      };
    default:
      return state;
  }
}

export default notepadReducer;
