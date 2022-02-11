import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveNewSpecialEventToLocalStorage } from '../lib/localStorage';
import { unlockConversation } from '../store/inventory';
import { unlockConversation as unlockConversationInLocalStorage } from '../lib/localStorage';
import { manageSpecialEvent } from '../store/specialEvents';

export const useSaveSpecialEvent = () => {
  const initialspecialEvents = useSelector((state) => state.specialEvent);
  const dispatch = useDispatch();
  return function saveSpecialEvent(payload) {
    const newSpecialEvent = { ...payload };
    Object.keys(payload).forEach((key) => {
      if (typeof payload[key] === 'function') {
        const cb = payload[key];
        newSpecialEvent[key] = cb(initialspecialEvents);
      }
    });
    dispatch(manageSpecialEvent(newSpecialEvent));
    saveNewSpecialEventToLocalStorage(newSpecialEvent);
  };
};

export const useUnlockConversation = () => {
  const dispatch = useDispatch();
  return function unlockConversationInReduxAndLocalStorage(payload) {
    console.log({ payload });
    dispatch(unlockConversation(payload));
    unlockConversationInLocalStorage(payload);
  };
};
