import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import dialogueReducer from './dialogue';
import conversationsReducer from './conversations';
import inventoryReducer from './inventory';
import spritesReducer from './sprites';

const reducer = combineReducers({
  dialogue: dialogueReducer,
  conversations: conversationsReducer,
  inventory: inventoryReducer,
  sprites: spritesReducer,
});

const store = configureStore({ reducer });

export default store;
