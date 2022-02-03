import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveNewSpecialEventToLocalStorage } from '../lib/localStorage';
import { manageSpecialEvent } from '../store/specialEvents';

export const useSaveSpecialEvent = () => {
  const initialspecialEvents = useSelector((state) => state.specialEvent);
  const dispatch = useDispatch();
  return function saveSpecialEvent(payload) {
    const newSpecialEvent = { ...payload };
    console.log({ payload });
    Object.keys(payload).forEach((key) => {
      if (typeof payload[key] === 'function') {
        const cb = payload[key];
        newSpecialEvent[key] = cb(initialspecialEvents);
      }
    });
    console.log({ newSpecialEvent });
    dispatch(manageSpecialEvent(newSpecialEvent));
    saveNewSpecialEventToLocalStorage(newSpecialEvent);
  };
};
