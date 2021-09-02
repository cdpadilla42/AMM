const { localStorage } = window;
const itemsInInventory = {
  items: ['The Prophecy'],
  act: 2,
};

export const addItemToLocalStorageInventory = (item) => {
  const storageData = JSON.parse(localStorage.getItem('itemsInInventory'));

  const initialInventory = storageData.items;

  const newInventory = [...initialInventory, item];

  storageData.items = newInventory;

  localStorage.setItem('itemsInInventory', JSON.stringify(storageData));
};

export const getUserItemsFromLocalStorage = () =>
  JSON.parse(localStorage.getItem('itemsInInventory'))?.items;
