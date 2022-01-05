import { createAction } from '@reduxjs/toolkit';

const initialState = {
  inquiryMode: false,
  inquiryDialogue: false,
};

export const startInquiryMode = createAction('START_INQUIRY_MODE');
export const endInquiryMode = createAction('END_INQUIRY_MODE');
export const startInquiryDialogue = createAction('START_INQUIRY_DIALOGUE');
export const endInquiryDialogue = createAction('END_INQUIRY_DIALOGUE');

// Reducer

function appReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
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
