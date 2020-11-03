import { configureStore } from '@reduxjs/toolkit';
import dialogueReducer from './dialogue/reducer';

const store = configureStore({ reducer: dialogueReducer });

export default store;
