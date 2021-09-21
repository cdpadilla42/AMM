import { createAction } from '@reduxjs/toolkit';

const initialState = {
  dialogue: false,
  background: false,
  conversationDetails: false,
  sprites: false,
  inventoryItems: false,
  animalNotes: false,
  sNotes: false,
  userInventoryFromLocalStorage: false,
};

export const setToLoaded = createAction('SET_TO_LOADED');

// Reducer

function loadedReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case setToLoaded.toString():
      const newState = { ...state };
      newState[payload] = true;
      return newState;
    default:
      return state;
  }
}

export default loadedReducer;
