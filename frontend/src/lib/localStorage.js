const { localStorage } = window;
const itemsInInventory = {
  items: [],
  act: 1,
};

export const addItemToLocalStorageInventory = (item) => {
  let storageData = JSON.parse(localStorage.getItem('itemsInInventory'));

  if (!storageData) {
    initializeLocalStorageInventory();
    storageData = itemsInInventory;
  }

  const initialInventory = storageData.items;

  const newInventory = [...initialInventory, item];

  storageData.items = newInventory;

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));
};

export const getUserItemsFromLocalStorage = () => {
  const res = JSON.parse(localStorage.getItem('itemsInInventory'))?.items;
  if (!!res) {
    return res;
  } else {
    initializeLocalStorageInventory();
    return { items: [] };
  }
};

export const initializeLocalStorageInventory = () => {
  if (!localStorage.getItem('itemsInInventory')) {
    localStorage.setItem('itemsInInventory', JSON.stringify(itemsInInventory));
  }
};
