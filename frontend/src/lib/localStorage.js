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
  console.log('function start', storageData);
  if (!storageData) {
    initializeLocalStorageInventory();
    storageData = itemsInInventory;
  }

  const initialInventory = storageData?.items ?? [];

  const newInventory = [...initialInventory, item];

  storageData.items = newInventory;

  console.log('function end', storageData);

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));
};

export const addSNoteToLocalStorageInventory = (sNote) => {
  let storageData = JSON.parse(localStorage.getItem('itemsInInventory'));
  console.log('function start', storageData);
  if (!storageData) {
    initializeLocalStorageInventory();
    storageData = itemsInInventory;
  }

  const initialSNotesList = storageData?.sNotes ?? [];

  const newSNotesList = [...initialSNotesList, sNote];

  storageData.sNotes = newSNotesList;

  console.log('function end', storageData);

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));
};

export const clearSNotesFromLocalStorage = () => {
  let storageData = JSON.parse(localStorage.getItem('itemsInInventory'));
  console.log('function start', storageData);
  if (!storageData) {
    initializeLocalStorageInventory();
    storageData = itemsInInventory;
  }

  const newSNotesList = [];

  storageData.sNotes = newSNotesList;

  console.log('function end', storageData);

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));
};

export const clearItemsFromLocalStorage = () => {
  let storageData = JSON.parse(localStorage.getItem('itemsInInventory'));
  console.log('function start', storageData);
  if (!storageData) {
    initializeLocalStorageInventory();
    storageData = itemsInInventory;
  }

  const newInventory = [];

  storageData.items = newInventory;

  console.log('function end', storageData);

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));
};

export const updateSNoteInLocalStorageInventory = (sNote, index) => {
  let storageData = JSON.parse(localStorage.getItem('itemsInInventory'));
  console.log('function start', storageData);

  const sNotesList = storageData.sNotes;

  sNotesList[index] = sNote;

  console.log('function end', storageData);

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));
};

export const getUserItemsFromLocalStorage = () => {
  const res = JSON.parse(localStorage.getItem('itemsInInventory'))?.items;
  console.log(res);
  if (!!res) {
    return res;
  } else {
    initializeLocalStorageInventory();
    return [];
  }
};

export const getUserSNotesFromLocalStorage = () => {
  const res = JSON.parse(localStorage.getItem('itemsInInventory'))?.sNotes;
  console.log(res);
  if (!!res) {
    return res;
  } else {
    initializeLocalStorageInventory();
    return [];
  }
};

export const initializeLocalStorageInventory = () => {
  console.log('Initializing local storage');
  if (!localStorage.getItem('itemsInInventory')) {
    localStorage.setItem('itemsInInventory', JSON.stringify(itemsInInventory));
  }
};
