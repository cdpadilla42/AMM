import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../hooks/useForm';
import { addItemToLocalStorageInventory } from '../lib/localStorage';
import { getInventoryItems } from '../store/inventory';

const AddToInventory = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({ item: '' });
  const { items: fullItemsList } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const matchedInGameItem = fullItemsList.find(
      (item) => item.name.toLowerCase() === inputs.item.trim().toLowerCase()
    );
    if (!!matchedInGameItem) {
      // Add to users inventory
      addItemToLocalStorageInventory(matchedInGameItem.name);
    } else {
      // Show error to user
    }
  };

  useEffect(() => {
    // TODO Rip me out when integrating with rest of application
    dispatch(getInventoryItems());
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="item"
        id="item"
        value={inputs.item}
        onChange={handleChange}
      />
    </form>
  );
};

export default AddToInventory;
