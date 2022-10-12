import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import sanityClient from '../client';

const initialState = { pics: [] };

export const getPictures = createAsyncThunk('GET_PICTURES', async () => {
  const response = await sanityClient.fetch(
    `*[_type == 'pic']{
        name,
        "url":pic.asset->url,

      }`
  );
  return response;
});

export const savePictures = createAction('SAVE_PICTURES');

// Reducer

function imagesReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'GET_PICTURES/fulfilled':
      return {
        ...state,
        pics: payload,
      };
    case savePictures.toString():
      return {
        ...state,
        pics: payload,
      };

    default:
      return state;
  }
}

export default imagesReducer;
