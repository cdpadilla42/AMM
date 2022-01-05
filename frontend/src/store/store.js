import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import appReducer from './app';
import dialogueReducer from './dialogue';
import conversationsReducer from './conversations';
import inventoryReducer from './inventory';
import healthReducer from './health';
import spritesReducer from './sprites';
import notepadReducer from './notepad';
import loadedReducer from './loaded';
import inquiryReducer from './inquiry';

const reducer = combineReducers({
  app: appReducer,
  dialogue: dialogueReducer,
  conversations: conversationsReducer,
  inventory: inventoryReducer,
  health: healthReducer,
  sprites: spritesReducer,
  notepad: notepadReducer,
  loaded: loadedReducer,
  inquiry: inquiryReducer,
});

const store = configureStore({ reducer });

export default store;
