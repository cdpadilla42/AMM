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
  getConversationBackground,
  getConversationDetails,
  getDialogue,
  getInquiryDialogues,
  getInventoryItems as getInventoryItemsSanityQuery,
  getMapLocations,
  getPictures,
  getSNotes,
  getSprites,
} from '../lib/sanityAPI';
import useQueryWithSaveToRedux from './useQueryWithSaveToRedux';
import { saveSprites } from '../store/sprites';
import { savePictures } from '../store/images';
import { saveDialogueData, saveInquiryDialogues } from '../store/dialogue';
import {
  saveBackground,
  saveConversationDetails,
} from '../store/conversations';

export default function useFetchTestimonyLevelData(conversationID) {
  // const snotesQuery = useQueryWithSaveToRedux('sNotes', getSNotes, saveSNotes);
  const dialogueQuery = useQueryWithSaveToRedux(
    'dialogue',
    () => getDialogue(conversationID),
    saveDialogueData
  );
  const inquiryQuery = useQueryWithSaveToRedux(
    'inquiries',
    () => getInquiryDialogues(conversationID),
    saveInquiryDialogues
  );
  const conversationBackgroundQuery = useQueryWithSaveToRedux(
    'background',
    () => getConversationBackground(conversationID),
    saveBackground
  );
  const conversationDetailsQuery = useQueryWithSaveToRedux(
    'conversationDetails',
    () => getConversationDetails(conversationID),
    saveConversationDetails
  );

  return {};
}
