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

export const getDialogue = createAsyncThunk(
  'GET_DIALOGUE',
  async (conversationID) => {
    const response = await sanityClient.fetch(
      `*[_type == "dialogue" && conversation._ref == "664db36f-6324-4828-a8ad-35c78f5180f1"]{
        name, responseOptions, needEvidence,
  			"phrase": phrase[]{
  				emotion->{emotion}, speaker->{name}, text	
				}
}`
    );
    return response;
  }
);

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
