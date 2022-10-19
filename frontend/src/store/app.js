import { createAction } from '@reduxjs/toolkit';

const initialState = {
  inquiryMode: false,
  inquiryDialogue: false,
  freeMode: false,
  sceneShifted: false,
  isPortfolio: false,
  hasError: false,
  playedAudio: false,
  soundPlaying: false,
  isLetterFormOpen: false,
};

export const startFreeMode = createAction('START_FREE_MODE');
export const endFreeMode = createAction('END_FREE_MODE');
export const startInquiryMode = createAction('START_INQUIRY_MODE');
export const endInquiryMode = createAction('END_INQUIRY_MODE');
export const startInquiryDialogue = createAction('START_INQUIRY_DIALOGUE');
export const endInquiryDialogue = createAction('END_INQUIRY_DIALOGUE');
export const setSceneShifted = createAction('SET_SCENE_SHIFTED');
export const setIsPortfolio = createAction('SET_IS_PORTFOLIO');
export const setHasError = createAction('SET_HAS_ERROR');
export const setPlayedAudio = createAction('SET_PLAYED_AUDIO');
export const setSoundPlaying = createAction('SET_SOUND_PLAYING');
export const setLetterFormOpen = createAction('SET_LETTER_FORM_OPEN');

// Reducer

function appReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case startFreeMode.toString():
      return {
        ...state,
        freeMode: true,
      };
    case endFreeMode.toString():
      return {
        ...state,
        freeMode: false,
      };
    case startInquiryMode.toString():
      return {
        ...state,
        inquiryMode: true,
      };
    case endInquiryMode.toString():
      return {
        ...state,
        inquiryMode: false,
      };
    case startInquiryDialogue.toString():
      return {
        ...state,
        inquiryDialogue: true,
      };
    case endInquiryDialogue.toString():
      return {
        ...state,
        inquiryDialogue: false,
      };
    case setSceneShifted.toString():
      return {
        ...state,
        sceneShifted: payload,
      };
    case setIsPortfolio.toString():
      return {
        ...state,
        isPortfolio: payload,
      };
    case setHasError.toString():
      return {
        ...state,
        hasError: payload,
      };
    case setPlayedAudio.toString():
      return {
        ...state,
        playedAudio: payload,
      };
    case setSoundPlaying.toString():
      return {
        ...state,
        soundPlaying: payload,
      };
    case setLetterFormOpen.toString():
      return {
        ...state,
        isLetterFormOpen: payload,
      };
    default:
      return state;
  }
}

export default appReducer;
