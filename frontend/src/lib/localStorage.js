import { act3ScenesInitialState } from '../store/act3Scenes';
import { specialEventsInitialState } from '../store/specialEvents';
import { itemsInInventoryAllButTheProphecy } from './constants';

const { localStorage } = window;
const itemsInInventory = {
  items: [],
  act: 1,
  sNotes: [],
  lastConversationID: '',
  userHasFullInventory: false,
  conversationsVisited: {},
  trialOneLastDialogueID: '',
  act3Scenes: act3ScenesInitialState,
  specialEvents: specialEventsInitialState,
  unlockedConversations: {},
  prereqs: {}, // for inquiry mode
  gameComplete: false,
};

/*
  sNotes Object: {
    [
      name: String,
      completed: Boolean,
      totalCount: Integer,
      userEventInstances: [] // * Array of dialogue ID's for where event fired. Keep same event from adding to count
    ]
  }
*/

export const saveCurrentConversationIdToLocalStorage = (conversationID) => {
  let storageData = JSON.parse(localStorage.getItem('itemsInInventory'));
  if (!storageData) {
    initializeLocalStorageInventory();
    storageData = itemsInInventory;
  }

  storageData.lastConversationID = conversationID;

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));
};

export const saveLastTrialDialogueIDToLocalStorage = (dialogueID) => {
  let storageData = JSON.parse(localStorage.getItem('itemsInInventory'));
  if (!storageData) {
    initializeLocalStorageInventory();
    storageData = itemsInInventory;
  }

  storageData.trialOneLastDialogueID = dialogueID;

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));
};

export const setLocalStorageToJustBeforeTrial = () => {
  localStorage.setItem(
    'itemsInInventory',
    JSON.stringify(itemsInInventoryAllButTheProphecy)
  );
};

export const saveNewAct3SceneToLocalStorage = (
  conversationID,
  upcomingScene
) => {
  let storageData = JSON.parse(localStorage.getItem('itemsInInventory'));
  if (!storageData) {
    initializeLocalStorageInventory();
    storageData = itemsInInventory;
  }

  const initialScenes = storageData?.act3Scenes ?? act3ScenesInitialState;

  const initialSceneToChange = initialScenes[conversationID];

  const newScene = { ...initialSceneToChange, scene: upcomingScene };

  const newScenes = { ...initialScenes, [conversationID]: newScene };

  storageData.act3Scenes = newScenes;

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));
};

export const unlockConversation = (conversationID) => {
  let storageData = JSON.parse(localStorage.getItem('itemsInInventory'));
  if (!storageData) {
    initializeLocalStorageInventory();
    storageData = itemsInInventory;
  }

  const initialUnlockedConversations = storageData?.unlockedConversations;

  const newUnlockedConversations = { ...initialUnlockedConversations };

  newUnlockedConversations[conversationID] = true;

  storageData.unlockedConversations = newUnlockedConversations;

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));
};

export const saveNewSpecialEventToLocalStorage = (payload) => {
  let storageData = JSON.parse(localStorage.getItem('itemsInInventory'));
  if (!storageData) {
    initializeLocalStorageInventory();
    storageData = itemsInInventory;
  }

  const initialEvents = storageData?.specialEvents ?? specialEventsInitialState;

  const newEvents = { ...initialEvents, ...payload };

  storageData.specialEvents = newEvents;

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));
};

export const saveFullInventoryToLocalSotrage = () => {
  let storageData = JSON.parse(localStorage.getItem('itemsInInventory'));
  if (!storageData) {
    initializeLocalStorageInventory();
    storageData = itemsInInventory;
  }

  storageData.userHasFullInventory = true;

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));
};

export const addItemToLocalStorageInventory = (item) => {
  let storageData = JSON.parse(localStorage.getItem('itemsInInventory'));
  if (!storageData) {
    initializeLocalStorageInventory();
    storageData = itemsInInventory;
  }

  const initialInventory = storageData?.items ?? [];

  const itemAlreadyInInventory = initialInventory.indexOf(item) !== -1;

  if (itemAlreadyInInventory) return;

  const newInventory = [...initialInventory, item];

  storageData.items = newInventory;

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));
};

export const removeItemToLocalStorageInventory = (item) => {
  let storageData = JSON.parse(localStorage.getItem('itemsInInventory'));
  if (!storageData) {
    initializeLocalStorageInventory();
    storageData = itemsInInventory;
  }

  const initialInventory = storageData?.items ?? [];

  const index = initialInventory.indexOf(item);

  if (index === -1) return;

  const newInventory = [...initialInventory];

  newInventory.splice(index, 1);

  storageData.items = newInventory;

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));
};

export const addSNoteToLocalStorageInventory = (sNote) => {
  let storageData = JSON.parse(localStorage.getItem('itemsInInventory'));
  if (!storageData) {
    initializeLocalStorageInventory();
    storageData = itemsInInventory;
  }

  const initialSNotesList = storageData?.sNotes ?? [];

  const newSNotesList = [...initialSNotesList, sNote];

  storageData.sNotes = newSNotesList;

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));
};

export const addConversationAsVisitedToLocalStorage = (conversationID) => {
  let storageData = JSON.parse(localStorage.getItem('itemsInInventory'));
  if (!storageData) {
    initializeLocalStorageInventory();
    storageData = itemsInInventory;
  }

  const initialConversationsVisited = storageData?.conversationsVisited;

  const newConversationsVisited = {
    ...initialConversationsVisited,
    [conversationID]: true,
  };

  storageData.conversationsVisited = newConversationsVisited;

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));
};

export const addPrereqToLocalStorage = (prereq) => {
  let storageData = JSON.parse(localStorage.getItem('itemsInInventory'));
  if (!storageData) {
    initializeLocalStorageInventory();
    storageData = itemsInInventory;
  }

  const initialPrereqs = storageData?.prereqs;

  const newPrereqs = {
    ...initialPrereqs,
    [prereq]: true,
  };

  storageData.prereqs = newPrereqs;

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));
};

export const clearSNotesFromLocalStorage = () => {
  let storageData = JSON.parse(localStorage.getItem('itemsInInventory'));
  if (!storageData) {
    initializeLocalStorageInventory();
    storageData = itemsInInventory;
  }

  const newSNotesList = [];

  storageData.sNotes = newSNotesList;

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));
};

export const clearItemsFromLocalStorage = () => {
  let storageData = JSON.parse(localStorage.getItem('itemsInInventory'));
  if (!storageData) {
    initializeLocalStorageInventory();
    storageData = itemsInInventory;
  }

  const newInventory = [];

  storageData.items = newInventory;

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));
};

export const clearConversationHistory = () => {
  let storageData = JSON.parse(localStorage.getItem('itemsInInventory'));
  if (!storageData) {
    initializeLocalStorageInventory();
    storageData = itemsInInventory;
  }

  const newConversationsVisited = {};

  storageData.conversationsVisited = newConversationsVisited;

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));
};

export const clearAllSaveData = () => {
  localStorage.setItem('itemsInInventory', JSON.stringify(itemsInInventory));
};

export const updateSNoteInLocalStorageInventory = (sNote, index) => {
  let storageData = JSON.parse(localStorage.getItem('itemsInInventory'));

  const sNotesList = storageData.sNotes;

  sNotesList[index] = sNote;

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));

  return sNotesList;
};

export const completeGameInLocalStorage = () => {
  let storageData = JSON.parse(localStorage.getItem('itemsInInventory'));

  storageData.gameComplete = true;

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));

  return true;
};

export const getLastConversationIDFromLocalStorage = () => {
  const res = JSON.parse(
    localStorage.getItem('itemsInInventory')
  )?.lastConversationID;
  if (!!res) {
    return res;
  } else {
    initializeLocalStorageInventory();
    return '';
  }
};

export const getTrialOneLastDialogueIDFromLocalStorage = () => {
  const res = JSON.parse(
    localStorage.getItem('itemsInInventory')
  )?.trialOneLastDialogueID;
  if (!!res) {
    return res;
  } else {
    initializeLocalStorageInventory();
    return '';
  }
};

export const getConversationsVisitedFromLocalStorage = () => {
  const res = JSON.parse(
    localStorage.getItem('itemsInInventory')
  )?.conversationsVisited;
  if (!!res) {
    return res;
  } else {
    initializeLocalStorageInventory();
    return {};
  }
};

export const getUserItemsFromLocalStorage = () => {
  const res = JSON.parse(localStorage.getItem('itemsInInventory'))?.items;
  if (!!res) {
    return res;
  } else {
    initializeLocalStorageInventory();
    return [];
  }
};

export const getUserSNotesFromLocalStorage = () => {
  const res = JSON.parse(localStorage.getItem('itemsInInventory'))?.sNotes;
  if (!!res) {
    return res;
  } else {
    initializeLocalStorageInventory();
    return [];
  }
};

export const getUserHasFullInventoryFromLocalStorage = () => {
  const res = JSON.parse(
    localStorage.getItem('itemsInInventory')
  )?.userHasFullInventory;
  if (!!res) {
    return res;
  } else {
    initializeLocalStorageInventory();
    return false;
  }
};

export const getAct3ScenesFromLocalStorage = () => {
  const res = JSON.parse(localStorage.getItem('itemsInInventory'))?.act3Scenes;
  if (!!res) {
    return res;
  } else {
    initializeLocalStorageInventory();
    return false;
  }
};

export const getPrereqsFromLocalStorage = () => {
  const res = JSON.parse(localStorage.getItem('itemsInInventory'))?.prereqs;
  if (!!res) {
    return res;
  } else {
    initializeLocalStorageInventory();
    return false;
  }
};

export const getUnlockedConversationsFromLocalStorage = () => {
  const res = JSON.parse(
    localStorage.getItem('itemsInInventory')
  )?.unlockedConversations;
  if (!!res) {
    return res;
  } else {
    initializeLocalStorageInventory();
    return false;
  }
};

export const getSpecialEventsFromLocalStorage = () => {
  const res = JSON.parse(
    localStorage.getItem('itemsInInventory')
  )?.specialEvents;
  if (!!res) {
    return res;
  } else {
    initializeLocalStorageInventory();
    return false;
  }
};

export const isGameCompleteLocalStorage = () => {
  const res = JSON.parse(
    localStorage.getItem('itemsInInventory')
  )?.gameComplete;
  if (!!res) {
    return res;
  } else {
    initializeLocalStorageInventory();
    return false;
  }
};

export const initializeLocalStorageInventory = () => {
  if (!localStorage.getItem('itemsInInventory')) {
    localStorage.setItem('itemsInInventory', JSON.stringify(itemsInInventory));
  }
};

export const resetSaveDataInLocalStorage = () => {
  localStorage.setItem('itemsInInventory', JSON.stringify(itemsInInventory));
};
