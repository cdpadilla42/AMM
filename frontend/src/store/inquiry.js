import { createAction } from '@reduxjs/toolkit';

const initialState = {
  currentInquiryDialogue: null,
  returnDialogue: null,
};

export const setCurrentInquiryDialogue = createAction(
  'SET_CURRENT_INQUIRY_DIALOGUE'
);
export const storeReturnDialogue = createAction('STORE_RETURN_DIALOGUE');

// Reducer

function inquiryReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case setCurrentInquiryDialogue.toString():
      return {
        ...state,
        currentInquiryDialogue: payload,
      };
    case storeReturnDialogue.toString():
      return {
        ...state,
        returnDialogue: payload,
      };
    default:
      return state;
  }
}

export default inquiryReducer;
