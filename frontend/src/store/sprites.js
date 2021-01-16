import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import sanityClient from '../client';

const initialState = {};

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
