import { createAsyncThunk } from '@reduxjs/toolkit';
import sanityClient from '../client';
import { sprites } from '../lib/sprites';

const initialState = { sprites };

export const getSprites = createAsyncThunk(
  'GET_SPRITES',
  async (conversationID) => {
    const response = await sanityClient.fetch(
      `*[_type == 'animalImage']{
        name,
				"images": images[]{
          emotion->{emotion},
          "spriteUrl": sprite.asset->url
        }
      }`
    );
    return response;
  }
);

// Reducer

function spritesReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'GET_SPRITES/fulfilled':
      return {
        ...state,
        sprites: payload,
      };

    default:
      return state;
  }
}

export default spritesReducer;
