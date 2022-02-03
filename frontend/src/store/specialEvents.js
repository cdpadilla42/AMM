import { createAction } from '@reduxjs/toolkit';
import { getSpecialEventsFromLocalStorage } from '../lib/localStorage';

export const specialEventsInitialState = {
  elvisAct3EvidenceCount: 0,
};

export const manageSpecialEvent = createAction('MANAGE_SPECIAL_EVENT');
export const incrementElvisAct3EvidenceCount = createAction(
  'INCREMENT_ELVIS_ACT_3_EVIDENCE_COUNT'
);
export const initializeSpecialEventsFromLocalStorage = createAction(
  'INITIALIZE_ACT3_SCENES_FROM_LOCAL_STORAGE'
);

// Reducer

function specialEventReducer(state = specialEventsInitialState, action) {
  const { type, payload } = action;
  switch (type) {
    case initializeSpecialEventsFromLocalStorage.toString():
      const specialEvents = getSpecialEventsFromLocalStorage();
      if (specialEvents) {
        return { ...specialEvents };
      } else {
        return specialEventsInitialState;
      }
    case manageSpecialEvent.toString():
      return {
        ...state,
        ...payload,
      };
    case incrementElvisAct3EvidenceCount.toString():
      return {
        ...state,
        elvisAct3EvidenceCount: state.elvisAct3EvidenceCount + 1,
      };
    default:
      return state;
  }
}

export default specialEventReducer;
