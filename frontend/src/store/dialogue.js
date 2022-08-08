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
  inquiry: [null],
  returnToDialoguePositionAfterIncorrect: 0,
  responseBoxIsOpen: false,
  dialogueFromSanity: 'apples',
  isInventoryOpen: false,
  inventoryScreen: 'items',
  isMapOpen: false,
  loading: true,
  isLeaving: false,
  lastEvidenceList: [],
  lastEvidencePrompt: '',
  storedDialoguePosition: null,
};

// Actions
export const nextDialogue = createAction('NEXT_DIALOGUE');
export const prevDialogue = createAction('PREV_DIALOGUE');
export const resetDialoguePosition = createAction('RESET_DIALOUGE_POSITION');
export const resetConversationToStart = createAction(
  'RESET_CONVERSATION_TO_START'
);
export const updateCurrentDialogueID = createAction(
  'UPDATE_CURRENT_DIALOGUE_ID'
);
export const clearDialogueData = createAction('CLEAR_DIALOGUE_DATA');
export const toggleResponseBox = createAction('TOGGLE_RESPONSE_BOX');
export const toggleInventory = createAction('TOGGLE_INVENTORY');
export const openInventory = createAction('OPEN_INVENTORY');
export const toggleMap = createAction('TOGGLE_MAP');
export const openMap = createAction('OPEN_MAP');
export const closeMap = createAction('CLOSE_MAP');
export const switchConversation = createAction('SWITCH_CONVERSATION');
export const resetDialogue = createAction('RESET_DIALOGUE');
export const setLeaving = createAction('SER_LEAVING');
export const jumpToDialoguePosition = createAction('JUMP_TO_DIALOGUE_POSITION');
export const jumpToDialoguePositionAndConversation = createAction(
  'JUMP_TO_DIALOGUE_POSITION_AND_CONVERSATION'
);
export const storeDialoguePositionForLater = createAction(
  'STORE_DIALOGUE_POSITION_FOR_LATER'
);
export const saveAsLastEvidenceList = createAction(
  'SAVE_AS_LAST_EVIDENCE_LIST'
);
export const saveAsLastEvidencePrompt = createAction(
  'SAVE_AS_LAST_EVIDENCE_PROMPT'
);
export const switchConversationFromIncorrect = createAction(
  'SWITCH_CONVERSATION_FROM_INCORRECT'
);
export const displayInvalidEvidenceDialogue = createAction(
  'DISPLAY_INVALID_ERROR_DIALOGUE'
);
export const displayComeBackLaterDialogue = createAction(
  'DISPLAY_COME_BACK_LATER_DIALOGUE'
);
export const displayComeBackLaterDialogueAct4 = createAction(
  'DISPLAY_COME_BACK_LATER_DIALOGUE_ACT_4'
);

export const getDialogue = createAsyncThunk(
  'GET_DIALOGUE',
  async (conversationID) => {
    const response = await sanityClient.fetch(
      `*[_type == "dialogue" && conversation._ref == "${conversationID}"]{
        name, responseOptions, needEvidence, multiBranchEvidence, useLastAvailableEvidenceList, inventoryPrompt, followingDialogueFromEvidence->{_id}, _id, isFinalDialogue, switchToInquiryMode, requiredEvidence->{name}, loseHealthOnIncorrect,
				animals[]->{name},
  			"phrase": phrase[]{
  				emotion->{emotion}, speaker->{name, color}, text, isGrey,
					link, sNotesEventRef->{name, count, successMessage, hidden, achievement, itemEventTriggered, itemEventType, itemEventRef->{name, _id}}, sNotesEventTriggered, sNotesEventType, 
          changePosition, leftAnimal->{name}, rightAnimal->{name}, leftOrientation, rightOrientation, leftAnimalCentered, centeredOrientation, leftEmotion->{emotion}, rightEmotion->{emotion},
          showImage,
          itemEventTriggered, itemEventType, itemEventRef->{name}, prereqEventTriggered, prereqEventRef->{name},
          objectionDialogue->{_id},
          "imageUrl": image.asset->url
				},
				"responseOptions": responseOptions[]{
          text, 
					followingDialogue->{_id}
        },
				"requiredEvidence": requiredEvidence[]->{name, _type},
				"evidenceWithPaths": evidenceWithPaths[]{followingDialogueFromEvidence->{_id}, possibleEvidence->{name}},
      }`
    );
    return response;
  }
);

export const getInquiryDialogues = createAsyncThunk(
  'GET_INQUIRY_DIAOLOGUES',
  async (conversationID) => {
    const response = await sanityClient.fetch(
      `*[_type == "inquiry" && conversation._ref == "${conversationID}"]{
        name, defaultResponse, 
        prereqRef->{name},
        "presentedEvidence": presentedEvidence[]->{name, _type},
  			"phrase": phrase[]{
  				emotion->{emotion}, speaker->{name, color}, text, isGrey, prereq->{name},
					link, sNotesEventRef->{name, count, successMessage, hidden, achievement, itemEventTriggered, itemEventType, itemEventRef->{name, _id}}, sNotesEventTriggered, sNotesEventType, 
          changePosition, leftAnimal->{name}, rightAnimal->{name}, leftOrientation, rightOrientation, leftAnimalCentered, centeredOrientation, leftEmotion->{emotion}, rightEmotion->{emotion},
          showImage, prereqEventTriggered, prereqEventRef->{name},
          itemEventTriggered, itemEventType, itemEventRef->{name, _id},
          "imageUrl": image.asset->url
				},
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
    case jumpToDialoguePosition.toString():
      return {
        ...state,
        currentDialoguePosition: payload,
      };
    case jumpToDialoguePositionAndConversation.toString():
      const { position, dialogueID } = payload;
      return {
        ...state,
        currentDialogueID: dialogueID,
        currentDialoguePosition: position,
      };
    case resetDialoguePosition.toString():
      return {
        ...state,
        currentDialoguePosition: 0,
      };
    case resetConversationToStart.toString():
      return {
        ...state,
        currentDialoguePosition: 0,
        currentDialogueID: null,
        prevDialogueID: null,
        responseBoxIsOpen: false,
      };
    case updateCurrentDialogueID.toString():
      return {
        ...state,
        currentDialogueID: null,
      };
    case clearDialogueData.toString():
      return {
        ...state,
        ...initialState,
      };
    case 'GET_DIALOGUE/fulfilled':
      return {
        ...state,
        dialogue: payload,
        loading: false,
      };
    case 'GET_INQUIRY_DIAOLOGUES/fulfilled':
      return {
        ...state,
        inquiry: payload,
        loading: false,
      };
    case resetDialogue.toString():
      return {
        ...state,
        dialogue: initialState.dialogue,
        loading: true,
        isLeaving: false,
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
        inventoryScreen: payload,
      };
    case openInventory.toString():
      return {
        ...state,
        isInventoryOpen: true,
        inventoryScreen: payload ?? state.inventoryScreen,
      };
    case toggleMap.toString():
      return {
        ...state,
        // isInventoryOpen: !state.isInventoryOpen,
        isMapOpen: !state.isMapOpen,
      };
    case openMap.toString():
      return {
        ...state,
        // isInventoryOpen: !state.isInventoryOpen,
        isMapOpen: true,
      };
    case closeMap.toString():
      return {
        ...state,
        // isInventoryOpen: !state.isInventoryOpen,
        isMapOpen: false,
      };
    case switchConversation.toString():
      return {
        ...state,
        currentDialogueID: payload,
        currentDialoguePosition: 0,
        responseBoxIsOpen: false,
      };
    case switchConversationFromIncorrect.toString():
      return {
        ...state,
        currentDialogueID: payload,
        currentDialoguePosition: state.returnToDialoguePositionAfterIncorrect,
        responseBoxIsOpen: false,
      };
    case displayInvalidEvidenceDialogue.toString():
      return {
        ...state,
        currentDialogueID: payload || 'Incorrect',
        prevDialogueID: state.currentDialogueID,
        returnToDialoguePositionAfterIncorrect: state.currentDialoguePosition,
        currentDialoguePosition: 0,
      };
    case displayComeBackLaterDialogue.toString():
      return {
        ...state,
        currentDialogueID: 'Come Back Later',
        prevDialogueID: state.currentDialogueID,
        currentDialoguePosition: 0,
      };
    case displayComeBackLaterDialogueAct4.toString():
      return {
        ...state,
        currentDialogueID: 'Come Back Later Act 4',
        prevDialogueID: state.currentDialogueID,
        currentDialoguePosition: 0,
      };
    case setLeaving.toString():
      return {
        ...state,
        isLeaving: true,
      };
    case saveAsLastEvidenceList.toString():
      if (!payload) return state;
      return {
        ...state,
        lastEvidenceList: payload,
      };
    case saveAsLastEvidencePrompt.toString():
      if (!payload) return state;
      return {
        ...state,
        lastEvidencePrompt: payload,
      };
    case storeDialoguePositionForLater.toString():
      return {
        ...state,
        storedDialoguePosition: payload,
      };
    default:
      return state;
  }
}

export default dialogueReducer;
