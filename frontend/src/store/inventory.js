import { createAction } from '@reduxjs/toolkit';
import sanityClient from '../client';

const initialState = [
  {
    name: 'Statue',
    img: 'url.jpg',
    description: 'Little bust of the thinking guy. 🤔',
  },
];

// Actions
export const addToInventory = createAction('ADD_TO_INVENTORY');

// Reducer

function inventoryReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case addToInventory.toString():
      return [...state, payload];
    default:
      return state;
  }
}

export default inventoryReducer;
