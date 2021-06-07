import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import sanityClient from '../client';

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
        "imageUrl": image.asset->url
 
}`
  );
  return response;
});

export const addToInventory = createAction('ADD_TO_INVENTORY');

// Reducer

function inventoryReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'GET_INVENTORY_ITEMS/fulfilled':
      return { ...state, items: payload };
    case 'GET_ANIMAL_NOTES/fulfilled':
      return { ...state, notes: payload };
    case addToInventory.toString():
      return { ...state, payload };
    default:
      return state;
  }
}

export default inventoryReducer;
