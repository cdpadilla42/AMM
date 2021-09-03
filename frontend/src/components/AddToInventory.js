import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useForm from '../hooks/useForm';
import { addItemToLocalStorageInventory } from '../lib/localStorage';
import { getInventoryItems, markInventoryUpdated } from '../store/inventory';

const AddToInventory = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({ item: '' });
  const { items: fullItemsList } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const matchedInGameItem = fullItemsList.find(
      (item) => item.name.toLowerCase() === inputs.item.trim().toLowerCase()
    );
    if (!!matchedInGameItem) {
      // Add to users inventory
      // save to local storage
      addItemToLocalStorageInventory(matchedInGameItem.name);
      // notify redux to trigger component updates
      dispatch(markInventoryUpdated());
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
  }, []);

  return (
    <StyledAddToInventory onSubmit={handleSubmit}>
      <div
        className={`addtoinventory_message_display ${message && message.type}`}
      >
        <span>{message?.text}</span>
      </div>
      <input
        type="text"
        name="item"
        id="item"
        value={inputs.item}
        onChange={handleChange}
      />
    </StyledAddToInventory>
  );
};

export default AddToInventory;

const StyledAddToInventory = styled.form`
  .addtoinventory_message_display.success {
    color: green;
  }

  .addtoinventory_message_display.error {
    color: red;
  }
`;
