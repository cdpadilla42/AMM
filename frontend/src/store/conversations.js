import { createAsyncThunk } from '@reduxjs/toolkit';
import sanityClient from '../client';

const initialState = {
  conversations: 'none',
};

// Actions
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

export const getBackground = createAsyncThunk(
  'GET_CONVERSATION_BACKGROUND',
  async (conversationID) => {
    const response = await sanityClient.fetch(
      `*[_type == "conversation" && conversation._id == "${conversationID}"]{
        "backgroundURL": background->{
          image{
          	asset->{url}
        	}
        }
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
    case `GET_CONVERSATION_BACKGROUND/fulfilled`:
      return {
        ...state,
        conversations: payload,
      };
    default:
      return state;
  }
}

export default conversationsReducer;
