import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import sanityClient from '../client';

const initialState = {
  currentDialoguePosition: 0,
  currentDialogueName: 'Start',
  currentDialogueID: null,
  prevDialogueID: null,
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
  responseBoxIsOpen: false,
  dialogueFromSanity: 'apples',
  isInventoryOpen: false,
  isMapOpen: false,
};

// Actions
export const nextDialogue = createAction('NEXT_DIALOGUE');
export const prevDialogue = createAction('PREV_DIALOGUE');
export const resetDialoguePosition = createAction('RESET_DIALOUGE_POSITION');
export const toggleResponseBox = createAction('TOGGLE_RESPONSE_BOX');
export const toggleInventory = createAction('TOGGLE_INVENTORY');
export const toggleMap = createAction('TOGGLE_MAP');
export const switchConversation = createAction('SWITCH_CONVERSATION');
export const displayInvalidEvidenceDialogue = createAction(
  'DISPLAY_INVALID_ERROR_DIALOGUE'
);

export const getDialogue = createAsyncThunk(
  'GET_DIALOGUE',
  async (conversationID) => {
    const response = await sanityClient.fetch(
      `*[_type == "dialogue" && conversation._ref == "${conversationID}"]{
        name, responseOptions, needEvidence, _id, isFinalDialogue, requiredEvidence->{name},
				animals[]->{name},
  			"phrase": phrase[]{
  				emotion->{emotion}, speaker->{name, color}, text, 
					link,
				},
				"responseOptions": responseOptions[]{
          text, 
					followingDialogue->{_id}
        },
				"requiredEvidence": requiredEvidence[]->{name}
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
    case toggleInventory.toString():
      return {
        ...state,
        isInventoryOpen: !state.isInventoryOpen,
      };
    case toggleMap.toString():
      return {
        ...state,
        // isInventoryOpen: !state.isInventoryOpen,
        isMapOpen: !state.isMapOpen,
      };
    case switchConversation.toString():
      // TODO Here - try including logic saying if the currentDialogueName is 'Incorrect', return to the previouse dialogue's final position
      return {
        ...state,
        currentDialogueID: payload,
        currentDialoguePosition: 0,
        responseBoxIsOpen: false,
      };
    case displayInvalidEvidenceDialogue.toString():
      return {
        ...state,
        currentDialogueID: 'Incorrect',
        prevDialogueID: state.currentDialogueID,
        currentDialoguePosition: 0,
      };
    default:
      return state;
  }
}

export default dialogueReducer;
