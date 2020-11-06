import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import sanityClient from '../client';

const initialState = {
  currentDialoguePosition: 0,
  dialogue: [
    ['Im mad!', 'mad'],
    ['I am sad!! !!!!!!!!!!!!!!!!!!!! !!!!!!', 'sad'],
    ['HAHAHAHA!', 'laugh'],
    ['Goodnight....', 'sleep'],
  ],
  dialogueFromSanity: 'apples',
};

// Actions
export const nextDialogue = createAction('NEXT_DIALOGUE');
export const prevDialogue = createAction('PREV_DIALOGUE');

export const getDialogue = createAsyncThunk('GET_DIALOGUE', async () => {
  const response = await sanityClient.fetch(
    `*[_type == "conversation"]{
              name, dialogue
      }`
  );
  return response;
});

// Reducer

function dialogueReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case nextDialogue.toString():
      return {
        ...state,
        currentDialoguePosition: state.currentDialoguePosition + 1,
      };
    case prevDialogue.toString():
      return {
        ...state,
        currentDialoguePosition: state.currentDialoguePosition - 1,
      };

    case 'GET_DIALOGUE/fulfilled':
      return {
        ...state,
        dialogue: payload,
      };
    default:
      return state;
  }
}

export default dialogueReducer;
