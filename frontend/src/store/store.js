import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import dialogueReducer from './dialogue';
import conversationsReducer from './conversations';

const reducer = combineReducers({
  dialogue: dialogueReducer,
  conversations: conversationsReducer,
});

const store = configureStore({ reducer });

export default store;
