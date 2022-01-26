import { createAction } from '@reduxjs/toolkit';

const initialState = {
  inquiryMode: false,
  inquiryDialogue: false,
  freeMode: false,
};

export const startFreeMode = createAction('START_FREE_MODE');
export const endFreeMode = createAction('END_FREE_MODE');
export const startInquiryMode = createAction('START_INQUIRY_MODE');
export const endInquiryMode = createAction('END_INQUIRY_MODE');
export const startInquiryDialogue = createAction('START_INQUIRY_DIALOGUE');
export const endInquiryDialogue = createAction('END_INQUIRY_DIALOGUE');

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
    default:
      return state;
  }
}

export default appReducer;
