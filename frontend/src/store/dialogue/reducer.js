import { createAction } from '@reduxjs/toolkit';

const initialState = {
  currentDialoguePosition: 0,
  dialogue: [
    ['This is the first sentence!', 'angry'],
    [
      'This is the second! WOW!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!! !!!!!!',
      'sad',
    ],
    ['This is the third sentence!', 'laughing'],
    ['This is the Fourth sentence!', 'sleepy'],
  ],
};

const nextDialogue = createAction('NEXT_DIALOGUE');

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
