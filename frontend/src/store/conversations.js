import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import sanityClient from '../client';

const initialState = {
  conversations: 'none',
  backgroundURL: null,
};

// Actions
export const resetBackground = createAction('RESET_BACKGROUND');
export const saveBackground = createAction('SAVE_BACKGROUND');
export const saveConversations = createAction('SAVE_CONVERSATIONS');
export const saveConversationDetails = createAction(
  'SAVE_CONVERSATION_DETAILS'
);
// export const getConversations = createAsyncThunk(
//   'GET_CONVERSATIONS',
//   async () => {
//     const response = await sanityClient.fetch(
//       `*[_type == "conversation"]{
//               name, _id, act, catchphrase,
//       }`
//     );
//     return response;
//   }
// );

// export const getBackground = createAsyncThunk(
//   'GET_CONVERSATION_BACKGROUND',
//   async (conversationID) => {
//     const response = await sanityClient.fetch(
//       `*[_type == "conversation" && conversation._id == "${conversationID}"]{
//         "backgroundURL": background->{
//           image{
//           	asset->{url}
//         	},
//           desktop{
//           	asset->{url}
//         	},
//           tablet{
//           	asset->{url}
//         	},
//           phone{
//           	asset->{url}
//         	},
//         }
//       }`
//     );
//     return response;
//   }
// );

// export const getConversationDetails = createAsyncThunk(
//   'GET_CONVERSATION_DETAILS',
//   async (conversationID) => {
//     const response = await sanityClient.fetch(
//       `*[_type == "conversation" && conversation._id == "${conversationID}"]{
//         act, _id,
//       }`
//     );
//     return response;
//   }
// );

// Reducer

function conversationsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case resetBackground.toString():
      return {
        ...state,
        backgroundURL: '',
      };
    case 'GET_CONVERSATIONS/fulfilled':
      return {
        ...state,
        conversations: payload,
      };
    case saveConversations.toString():
      return {
        ...state,
        conversations: payload,
      };
    case 'GET_CONVERSATION_DETAILS/fulfilled':
      return {
        ...state,
        conversation: payload,
      };
    case saveConversationDetails.toString():
      return {
        ...state,
        conversation: payload,
      };
    case `GET_CONVERSATION_BACKGROUND/fulfilled`:
      return {
        ...state,
        backgroundURL: payload[0],
      };
    case saveBackground.toString():
      return {
        ...state,
        backgroundURL: payload[0],
      };
    default:
      return state;
  }
}

export default conversationsReducer;
