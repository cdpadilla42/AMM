import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import dialogueReducer from './dialogue';
import conversationsReducer from './conversations';
import inventoryReducer from './inventory';
import spritesReducer from './sprites';
import notepadReducer from './notepad';
import loadedReducer from './loaded';

const reducer = combineReducers({
  dialogue: dialogueReducer,
  conversations: conversationsReducer,
  inventory: inventoryReducer,
  sprites: spritesReducer,
  notepad: notepadReducer,
  loaded: loadedReducer,
});

const store = configureStore({ reducer });

export default store;
