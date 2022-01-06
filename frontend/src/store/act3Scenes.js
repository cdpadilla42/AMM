import { createAction } from '@reduxjs/toolkit';

export const act3ScenesInitialState = {
  '65c247c3-947b-4444-bf08-b7aed9c4c89b': {
    conversation: 'Julian',
    scene: {
      name: 'Start',
      dialogueID: 'd24e6cef-f067-4330-9cdf-bf780af06446',
    },
  },
};

export const updateScenes = createAction('UPDATE_SCENES');

// Reducer

function act3ScenesReducer(state = act3ScenesInitialState, action) {
  const { type, payload } = action;
  switch (type) {
    case updateScenes.toString():
      const { conversationID, upcomingScene } = payload;

      return {
        ...state,
        [conversationID]: upcomingScene,
      };
    default:
      return state;
  }
}

export default act3ScenesReducer;
