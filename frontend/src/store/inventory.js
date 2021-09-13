import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import sanityClient from '../client';
import {
  getUserItemsFromLocalStorage,
  getUserSNotesFromLocalStorage,
} from '../lib/localStorage';

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
  sNotes: [],
  userSNotes: [],
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
        name, descriptionA, descriptionB, descriptionC, descriptionD, nickname,
        "animalRef": animalRef->{color},
        "imageUrl": image.asset->url
}`
  );
  return response;
});

export const getSNotes = createAsyncThunk('GET_SNOTES', async () => {
  const response = await sanityClient.fetch(
    `*[_type == "snotes"]{
        name, description, count,
}`
  );
  return response;
});

export const initializeUserInventoryFromLocalStorage = createAction(
  'INITIALIZAE_USER_INVENTORY_FROM_LOCAL_STORAGE'
);
export const addToInventory = createAction('ADD_TO_INVENTORY');
export const addToSNotesList = createAction('ADD_TO_SNOTES_LIST');
export const updateSNote = createAction('UPDATE_SNOTE');
export const markInventoryUpdated = createAction('MARK_INVENTORY_UPDATED');

// Reducer

function inventoryReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'GET_INVENTORY_ITEMS/fulfilled':
      return { ...state, items: payload };
    case 'GET_ANIMAL_NOTES/fulfilled':
      return { ...state, notes: payload };
    case 'GET_SNOTES/fulfilled':
      return { ...state, sNotes: payload };
    case initializeUserInventoryFromLocalStorage.toString():
      const userItems = getUserItemsFromLocalStorage();
      const userSNotes = getUserSNotesFromLocalStorage();
      return { ...state, userItems, userSNotes };
    case addToInventory.toString():
      const newItems = [...state.userItems, payload];
      return { ...state, userItems: newItems };
    case addToSNotesList.toString():
      const newSNotes = [...state.userSNotes, payload];
      return { ...state, userSNotes: newSNotes };
    case updateSNote.toString():
      const { sNote, index } = payload;
      const newSNotesList = [...state.userSNotes];
      newSNotesList[index] = sNote;
      return { ...state, userSNotes: newSNotesList };
    case markInventoryUpdated.toString():
      const lastUpdated = new Date().toISOString();
      return { ...state, lastUpdated };
    default:
      return state;
  }
}

export default inventoryReducer;
