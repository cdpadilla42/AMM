const { localStorage } = window;
const itemsInInventory = {
  items: [],
  act: 1,
  sNotes: [],
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

export const addItemToLocalStorageInventory = (item) => {
  let storageData = JSON.parse(localStorage.getItem('itemsInInventory'));
  if (!storageData) {
    initializeLocalStorageInventory();
    storageData = itemsInInventory;
  }

  const initialInventory = storageData?.items ?? [];

  const newInventory = [...initialInventory, item];

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

export const updateSNoteInLocalStorageInventory = (sNote, index) => {
  let storageData = JSON.parse(localStorage.getItem('itemsInInventory'));

  const sNotesList = storageData.sNotes;

  sNotesList[index] = sNote;

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));
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

export const initializeLocalStorageInventory = () => {
  if (!localStorage.getItem('itemsInInventory')) {
    localStorage.setItem('itemsInInventory', JSON.stringify(itemsInInventory));
  }
};
