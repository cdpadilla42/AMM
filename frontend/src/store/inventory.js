import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import sanityClient from '../client';
import { getUserItemsFromLocalStorage } from '../lib/localStorage';

const initialState = {
  items: [
    {
      name: 'Statue',
      img: 'url.jpg',
      description: 'Little bust of the thinking guy. 🤔',
    },
  ],
  notes: [
    {
      name: 'Katt',
      img: 'url.jpg',
      description: 'QT',
    },
  ],
  userItems: [],
  lastUpdated: null,
};

// Actions
export const getInventoryItems = createAsyncThunk(
  'GET_INVENTORY_ITEMS',
  // TODO Refactor me to grab all items and animal notes
  async () => {
    const response = await sanityClient.fetch(
      `*[_type == "item"]{
        name, description, descriptionA, descriptionB, descriptionC, descriptionD,
        "imageUrl": image.asset->url
 
}`
    );
    return response;
  }
);

export const getAnimalNotes = createAsyncThunk('GET_ANIMAL_NOTES', async () => {
  const response = await sanityClient.fetch(
    `*[_type == "animalNotes"]{
        name, description, nickname,
        "animalRef": animalRef->{color},
        "imageUrl": image.asset->url
 
}`
  );
  return response;
});

export const initializeUserInventoryFromLocalStorage = createAction(
  'INITIALIZAE_USER_INVENTORY_FROM_LOCAL_STORAGE'
);
export const addToInventory = createAction('ADD_TO_INVENTORY');
export const markInventoryUpdated = createAction('MARK_INVENTORY_UPDATED');

// Reducer

function inventoryReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'GET_INVENTORY_ITEMS/fulfilled':
      return { ...state, items: payload };
    case 'GET_ANIMAL_NOTES/fulfilled':
      return { ...state, notes: payload };
    case initializeUserInventoryFromLocalStorage.toString():
      const userItems = getUserItemsFromLocalStorage();
      return { ...state, userItems };
    case addToInventory.toString():
      const newItems = [...state.items, payload];
      return { ...state, items: newItems };
    case markInventoryUpdated.toString():
      const lastUpdated = new Date().toISOString();
      return { ...state, lastUpdated };
    default:
      return state;
  }
}

export default inventoryReducer;
