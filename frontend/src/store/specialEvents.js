import { createAction } from '@reduxjs/toolkit';
import { getSpecialEventsFromLocalStorage } from '../lib/localStorage';

export const specialEventsInitialState = {
  elvisAct3EvidenceCount: 0,
  act2TrialJulianTestimonyDialoguesPassed: {},
};

export const manageSpecialEvent = createAction('MANAGE_SPECIAL_EVENT');
export const incrementElvisAct3EvidenceCount = createAction(
  'INCREMENT_ELVIS_ACT_3_EVIDENCE_COUNT'
);
export const addAct2TrialJuliantestimonyDialogue = createAction(
  'ADD_ACT_2_TRIAL_JULIAN_TESTIMONY_DIALOGUE'
);
export const initializeSpecialEventsFromLocalStorage = createAction(
  'INITIALIZE_SPECIAL_EVENTS_FROM_LOCAL_STORAGE'
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
    case addAct2TrialJuliantestimonyDialogue.toString():
      const newDialogues = {
        ...state.act2TrialJulianTestimonyDialoguesPassed,
        ...payload,
      };
      return {
        ...state,
        act2TrialJulianTestimonyDialoguesPassed: newDialogues,
      };
    default:
      return state;
  }
}

export default specialEventReducer;
