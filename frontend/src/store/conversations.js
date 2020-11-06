import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import sanityClient from '../client';

const initialState = {
  conversations: 'none',
};

// Actions
export const nextDialogue = createAction('NEXT_DIALOGUE');
export const prevDialogue = createAction('PREV_DIALOGUE');

export const getConversations = createAsyncThunk(
  'GET_CONVERSATIONS',
  async () => {
    const response = await sanityClient.fetch(
      `*[_type == "conversation"]{
              name, _id
      }`
    );
    return response;
  }
);

// Reducer

function conversationsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'GET_CONVERSATIONS/fulfilled':
      return {
        ...state,
        conversations: payload,
      };
    default:
      return state;
  }
}

export default conversationsReducer;
