import { createAction } from '@reduxjs/toolkit';

const initialState = {
  currentDialoguePosition: 0,
  dialogue: [
    ['Im mad!', 'mad'],
    ['I am sad!! !!!!!!!!!!!!!!!!!!!! !!!!!!', 'sad'],
    ['HAHAHAHA!', 'laugh'],
    ['Goodnight....', 'sleep'],
  ],
};

export const nextDialogue = createAction('NEXT_DIALOGUE');

function dialogueReducer(state = initialState, action) {
  switch (action.type) {
    case nextDialogue.toString():
      return {
        ...state,
        currentDialoguePosition: state.currentDialoguePosition + 1,
      };
    default:
      return state;
  }
}

export default dialogueReducer;
