import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import sanityClient from '../client';

const initialState = {
  currentDialoguePosition: 0,
  currentDialogueName: 'Start',
  dialogue: [
    {
      name: 'Start',
      phrase: [
        {
          emotion: 'normal',
          text: '',
          speaker: '',
        },
      ],
    },
  ],
  responseBoxIsOpen: true,
  dialogueFromSanity: 'apples',
};

// Actions
export const nextDialogue = createAction('NEXT_DIALOGUE');
export const prevDialogue = createAction('PREV_DIALOGUE');
export const resetDialoguePosition = createAction('RESET_DIALOUGE_POSITION');
export const toggleResponseBox = createAction('TOGGLE_RESPONSE_BOX');

export const getDialogue = createAsyncThunk(
  'GET_DIALOGUE',
  async (conversationID) => {
    const response = await sanityClient.fetch(
      `*[_type == "dialogue" && conversation._ref == "${conversationID}"]{
        name, responseOptions, needEvidence,
  			"phrase": phrase[]{
  				emotion->{emotion}, speaker->{name}, text, _id
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
    case resetDialoguePosition.toString():
      return {
        ...state,
        currentDialoguePosition: 0,
      };
    case 'GET_DIALOGUE/fulfilled':
      return {
        ...state,
        dialogue: payload,
      };
    case toggleResponseBox.toString():
      return {
        ...state,
        responseBoxIsOpen: !state.responseBoxIsOpen,
      };
    default:
      return state;
  }
}

export default dialogueReducer;
