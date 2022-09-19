import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import sanityClient from '../client';
import fullItemsList from '../lib/fullItemsList';
import {
  getConversationsVisitedFromLocalStorage,
  getPrereqsFromLocalStorage,
  getUnlockedConversationsFromLocalStorage,
  getUserHasFullInventoryFromLocalStorage,
  getUserItemsFromLocalStorage,
  getUserSNotesFromLocalStorage,
} from '../lib/localStorage';

const initialState = {
  items: fullItemsList,
  notes: [],
  mapLocations: [],
  sNotes: [],
  userSNotes: [],
  userItems: [],
  lastUpdated: null,
  userPromptedForEvidence: false,
  userHasFullInventory: false,
  conversationsVisited: {},
  unlockedConversations: {},
  prereqs: {},
  gameComplete: false,
};

// Actions
export const getInventoryItems = createAsyncThunk(
  'GET_INVENTORY_ITEMS',
  // TODO Refactor me to grab all items and animal notes
  async () => {
    const response = await sanityClient.fetch(
      `*[_type == "item"]{
        name, description, restrictUserAddingToInventory, descriptionA, descriptionB, descriptionC, descriptionD,
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

export const getMapLocations = createAsyncThunk(
  'GET_MAP_LOCATIONS',
  async () => {
    const response = await sanityClient.fetch(
      `*[_type == "mapLocation"]{
        name, descriptionA, descriptionC, descriptionD,
        "imageUrl": image.asset->url
}`
    );
    return response;
  }
);

export const getSNotes = createAsyncThunk('GET_SNOTES', async () => {
  const response = await sanityClient.fetch(
    `*[_type == "snotes"]{
        name, description, count, hidden, achievement, successMessage, itemEventTriggered, itemEventType, itemEventRef->{name},
}`
  );
  return response;
});

export const getPrereqs = createAsyncThunk('GET_PREREQS', async () => {
  const response = await sanityClient.fetch(
    `*[_type == "prereq"]{
        name, description
}`
  );
  return response;
});

export const initializeUserInventoryFromLocalStorage = createAction(
  'INITIALIZAE_USER_INVENTORY_FROM_LOCAL_STORAGE'
);
export const addToInventory = createAction('ADD_TO_INVENTORY');
export const addToPrereqs = createAction('ADD_TO_PREREQS');
export const removeFromInventory = createAction('REMOVE_FROM_INVENTORY');
export const addToSNotesList = createAction('ADD_TO_SNOTES_LIST');
export const updateSNote = createAction('UPDATE_SNOTE');
export const markInventoryUpdated = createAction('MARK_INVENTORY_UPDATED');
export const markUserPromptedForEvidence = createAction(
  'MARK_USER_PROMPTED_FOR_EVIDENCE'
);
export const markUserNotPromptedForEvidence = createAction(
  'MARK_USER_NOT_PROMPTED_FOR_EVIDENCE'
);
export const markUserHasFullInventory = createAction(
  'MARK_USER_HAS_FULL_INVENTORY'
);
export const addToConversationsVisited = createAction(
  'ADD_TO_CONVERSATIONS_VISITED'
);
export const unlockConversation = createAction('UNLOCK_CONVERSATION');
export const completeGame = createAction('COMPLETE_GAME');
export const resetSaveData = createAction('RESET_SAVE_DATA');

// Reducer

function inventoryReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'GET_INVENTORY_ITEMS/fulfilled':
      return { ...state, items: payload };
    case 'GET_ANIMAL_NOTES/fulfilled':
      return { ...state, notes: payload };
    case 'GET_MAP_LOCATIONS/fulfilled':
      return { ...state, mapLocations: payload };
    case 'GET_SNOTES/fulfilled':
      return { ...state, sNotes: payload };
    case initializeUserInventoryFromLocalStorage.toString():
      const userItems = getUserItemsFromLocalStorage();
      const userHasFullInventory = getUserHasFullInventoryFromLocalStorage();
      const userSNotes = getUserSNotesFromLocalStorage();
      const conversationsVisited = getConversationsVisitedFromLocalStorage();
      const unlockedConversations = getUnlockedConversationsFromLocalStorage();
      const prereqs = getPrereqsFromLocalStorage();
      return {
        ...state,
        userItems,
        userSNotes,
        userHasFullInventory,
        conversationsVisited,
        unlockedConversations,
        prereqs,
      };
    case addToInventory.toString():
      const newItems = [...state.userItems];
      const itemAlreadyInInventory = newItems.indexOf(payload) !== -1;
      if (itemAlreadyInInventory) {
        return { ...state };
      } else {
        return { ...state, userItems: [...newItems, payload] };
      }
    case removeFromInventory.toString():
      const newItemsList = [...state.userItems];
      const indexToRemove = newItemsList.indexOf(payload);
      if (indexToRemove !== -1) {
        newItemsList.splice(indexToRemove, 1);
      }
      return { ...state, userItems: newItemsList };
    case addToSNotesList.toString():
      const newSNotes = [...state.userSNotes, payload];
      return { ...state, userSNotes: newSNotes };
    case updateSNote.toString():
      const { sNote, index } = payload;
      const newSNotesList = state.userSNotes.map((sNote) => ({ ...sNote }));
      newSNotesList[index] = { ...sNote };
      return { ...state, userSNotes: newSNotesList };
    case markInventoryUpdated.toString():
      const lastUpdated = new Date().toISOString();
      return { ...state, lastUpdated };
    case markUserPromptedForEvidence.toString():
      return { ...state, userPromptedForEvidence: true };
    case markUserNotPromptedForEvidence.toString():
      return { ...state, userPromptedForEvidence: false };
    case markUserHasFullInventory.toString():
      return { ...state, userHasFullInventory: true };
    case addToConversationsVisited.toString():
      const newConversations = {
        ...state.conversationsVisited,
        [payload]: true,
      };
      return { ...state, conversationsVisited: newConversations };
    case addToPrereqs.toString():
      const newPrereqs = {
        ...state.prereqs,
        [payload]: true,
      };
      return { ...state, prereqs: newPrereqs };
    case unlockConversation.toString():
      const newUnlockedConversations = {
        ...state.unlockedConversations,
        [payload]: true,
      };
      return { ...state, unlockedConversations: newUnlockedConversations };
    case completeGame.toString():
      return { ...state, gameComplete: true };
    case resetSaveData.toString():
      return { ...initialState };
    default:
      return state;
  }
}

export default inventoryReducer;
