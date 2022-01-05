import { createAction } from '@reduxjs/toolkit';

const initialState = {
  currentInquiryDialogue: null,
};

export const setCurrentInquiryDialogue = createAction(
  'SET_CURRENT_INQUIRY_DIALOGUE'
);

// Reducer

function inquiryReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case setCurrentInquiryDialogue.toString():
      return {
        ...state,
        currentInquiryDialogue: payload,
      };
    default:
      return state;
  }
}

export default inquiryReducer;
