import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import {
  saveAnimalNotesData,
  saveInventoryItemsData,
  saveMapLocationData,
  saveSNotes,
} from '../store/inventory';
import {
  getAnimalNotes,
  getConversations,
  getInventoryItems as getInventoryItemsSanityQuery,
  getMapLocations,
  getPictures,
  getSNotes,
  getSprites,
} from '../lib/sanityAPI';
import useQueryWithSaveToRedux from './useQueryWithSaveToRedux';
import { saveSprites } from '../store/sprites';
import { savePictures } from '../store/images';
import { saveConversations } from '../store/conversations';

export default function useFetchAppLevelData() {
  const snotesQuery = useQueryWithSaveToRedux('sNotes', getSNotes, saveSNotes);
  const picturesQuery = useQueryWithSaveToRedux(
    'pictures',
    getPictures,
    savePictures
  );
  const spritesQuery = useQueryWithSaveToRedux(
    'sprites',
    getSprites,
    saveSprites
  );
  // const prereqsQuery = useQueryWithSaveToRedux(
  //   'prereqs',
  //   getPrereqs,
  //   savePrereqs
  // );
  const mapDataQuery = useQueryWithSaveToRedux(
    'mapLocations',
    getMapLocations,
    saveMapLocationData
  );
  const animalNotesQuery = useQueryWithSaveToRedux(
    'animalNotes',
    getAnimalNotes,
    saveAnimalNotesData
  );
  const inventoryItemsQuery = useQueryWithSaveToRedux(
    'inventoryItems',
    getInventoryItemsSanityQuery,
    saveInventoryItemsData
  );
  const conversationsQuery = useQueryWithSaveToRedux(
    'conversations',
    getConversations,
    saveConversations
  );

  return {};
}
