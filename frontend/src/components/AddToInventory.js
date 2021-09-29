import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import useForm from '../hooks/useForm';
import { addItemToLocalStorageInventory } from '../lib/localStorage';
import { addToInventory } from '../store/inventory';

const AddToInventory = ({
  closeDisplay,
  isOpen,
  close,
  showErrorAnimation,
}) => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({ item: '' });
  const { items: fullItemsList, userItems } = useSelector(
    (state) => state.inventory
  );
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // focus on input el.
      inputRef.current.focus();
    }
  }, [isOpen]);

  // useEffect(() => {
  //   const listenForClickOutside = (e) => {
  //     if (e.target !== containerRef.current) closeDisplay();
  //     console.log(e);
  //   };

  //   window.addEventListener('click', listenForClickOutside);

  //   return () => {
  //     window.removeEventListener('click', listenForClickOutside);
  //   };
  // }, [containerRef]);

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
        clearForm();
        return;
      } else {
        // Add to users inventory
        // save to local storage
        addItemToLocalStorageInventory(matchedInGameItem.name);
        // add to redux
        dispatch(addToInventory(matchedInGameItem.name));
        toast(
          `🔎  Great! ${matchedInGameItem.name.toUpperCase()} was added to the evidence file.`
        );
        clearForm();
        close();
      }
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
    showErrorAnimation();
    setTimeout(() => {
      setMessage(null);
    }, 7000);
  };

  // useEffect(() => {
  //   // TODO Rip me out when integrating with rest of application
  //   dispatch(getInventoryItems());
  //   dispatch(initializeUserInventoryFromLocalStorage());
  // }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    closeDisplay();
  };

  return (
    <StyledAddToInventory onSubmit={handleSubmit} ref={containerRef}>
      <button
        className="addtoinventory_close"
        aria-label="Close Add Item Modal Box"
        type="button"
        onClick={handleCloseClick}
      >
        &times;
      </button>
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
        ref={inputRef}
      />
    </StyledAddToInventory>
  );
};

export default AddToInventory;

AddToInventory.propTypes = {
  closeDisplay: PropTypes.func,
  isOpen: PropTypes.bool,
};

AddToInventory.defaultProps = {
  closeDisplay: () => {},
  isOpen: false,
};

const StyledAddToInventory = styled.form`
  text-align: center;

  .addtoinventory_close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }

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
