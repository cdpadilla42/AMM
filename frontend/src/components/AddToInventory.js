import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useForm from '../hooks/useForm';
import { addItemToLocalStorageInventory } from '../lib/localStorage';
import {
  addToInventory,
  getInventoryItems,
  initializeUserInventoryFromLocalStorage,
  markInventoryUpdated,
} from '../store/inventory';

const AddToInventory = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({ item: '' });
  const { items: fullItemsList, userItems } = useSelector(
    (state) => state.inventory
  );
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const matchedInGameItem = fullItemsList.find(
      (item) => item?.name.toLowerCase() === inputs.item.trim().toLowerCase()
    );
    if (!!matchedInGameItem) {
      if (userItems.includes(matchedInGameItem.name)) {
        showMessage({
          type: 'success',
          text: `Oh hey! ${matchedInGameItem.name} is already in the file.`,
        });
        return;
      }
      // Add to users inventory
      // save to local storage
      addItemToLocalStorageInventory(matchedInGameItem.name);
      // add to redux
      dispatch(addToInventory(matchedInGameItem.name));
      showMessage({
        type: 'success',
        text: `Great! ${matchedInGameItem.name} was added to the evidence file.`,
      });
    } else {
      // Show error to user
      showMessage({
        type: 'error',
        text: "Hmmm, that doesn't seem like a piece of evidence. Did you spell it correctly?",
      });
    }
  };

  const showMessage = (message) => {
    /*
    message: {
      type: 'success' || 'error',
      text: String,
    } 
    */
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 7000);
  };

  useEffect(() => {
    // TODO Rip me out when integrating with rest of application
    dispatch(getInventoryItems());
    dispatch(initializeUserInventoryFromLocalStorage());
  }, []);

  return (
    <StyledAddToInventory onSubmit={handleSubmit}>
      <h2 className="addtoinventory_title">Add Item to Inventory</h2>
      <div
        className={`addtoinventory_message_display ${message && message.type}`}
      >
        <span>{message?.text}</span>
      </div>
      <input
        type="text"
        name="item"
        className="addtoinventory_input"
        id="item"
        value={inputs.item}
        onChange={handleChange}
      />
    </StyledAddToInventory>
  );
};

export default AddToInventory;

const StyledAddToInventory = styled.form`
  text-align: center;
  .addtoinventory_title {
    margin: 0;
  }

  .addtoinventory_message_display {
    height: 25px;
  }

  .addtoinventory_message_display.success {
    color: green;
  }

  .addtoinventory_message_display.error {
    color: red;
  }

  .addtoinventory_input {
    width: 200px;
    font-size: 1.8rem;
  }
`;
