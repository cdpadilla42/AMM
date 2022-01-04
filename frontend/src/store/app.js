import { createAction } from '@reduxjs/toolkit';

const initialState = {
  inquiryMode: false,
};

export const startInquiryMode = createAction('START_INQUIRY_MODE');
export const endInquiryMode = createAction('END_INQUIRY_MODE');

// Reducer

function healthReducer(state = initialState, action) {
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
    default:
      return state;
  }
}

export default healthReducer;
