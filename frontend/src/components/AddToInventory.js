import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import useForm from '../hooks/useForm';
import {
  addItemToLocalStorageInventory,
  saveFullInventoryToLocalSotrage,
} from '../lib/localStorage';
import { addToInventory, markUserHasFullInventory } from '../store/inventory';
import fullItemsList from '../lib/fullItemsList';

const AddToInventory = ({
  closeDisplay,
  isOpen,
  close,
  showErrorAnimation,
}) => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({ item: '' });
  const { userItems, userHasFullInventory } = useSelector(
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

  const isItemMatch = (item, input) => {
    if (item.includes('*')) return false;
    const cleanedInput = input.trim().toLowerCase();
    const cleanedItem = item.toLowerCase();
    const cleanedItemWords = cleanedItem.split(' ');
    if (cleanedItemWords.length === 1) {
      return cleanedItem === cleanedInput;
    } else {
      return cleanedItem.includes(cleanedInput);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const matchedInGameItem = fullItemsList.find(
      // (item) => item?.name.toLowerCase() === inputs.item.trim().toLowerCase()
      (item) =>
        isItemMatch(item?.name, inputs.item) &&
        !item.restrictUserAddingToInventory
    );
    console.log(matchedInGameItem, inputs.name);
    if (
      !!matchedInGameItem &&
      !matchedInGameItem.restrictUserAddingToInventory
    ) {
      if (userItems.includes(matchedInGameItem.name)) {
        showMessage({
          type: 'success',
          text: `Oh hey! ${matchedInGameItem.name} is already in the file.`,
        });
        clearForm();
        return;
      } else {
        // check inventory size
        let fullInventory = false;
        if (userItems.length === 31) {
          fullInventory = true;
        }
        const tempUserInventoryForCheckingIfFull = [...userItems];
        tempUserInventoryForCheckingIfFull.push(matchedInGameItem.name);

        const requiredEvidence = [
          'Star Fragment',
          'Sewing Machine',
          'Painting Set',
        ];

        fullInventory = true;

        requiredEvidence.forEach((evidence) => {
          if (!tempUserInventoryForCheckingIfFull.includes(evidence)) {
            fullInventory = false;
          }
        });

        // ADD TO USERS INVENTORY
        // save to local storage
        addItemToLocalStorageInventory(matchedInGameItem.name);
        // add to redux
        dispatch(addToInventory(matchedInGameItem.name));
        toast(
          `🔎  Great! ${matchedInGameItem.name.toUpperCase()} was added to the evidence file.`
        );
        // if full inventory, proceed to updating redux
        if (fullInventory && !userHasFullInventory) {
          dispatch(markUserHasFullInventory());
          saveFullInventoryToLocalSotrage();
          toast(
            "🎉 You've gathered enough evidence! One step closer to the trial!"
          );
        }
        clearForm();
        close();
      }
    } else {
      // Show error to user
      showMessage({
        type: 'input-error',
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
      <div className="input_wrapper">
        <input
          type="text"
          name="item"
          className="addtoinventory_input"
          id="item"
          value={inputs.item}
          onChange={handleChange}
          ref={inputRef}
        />
      </div>
    </StyledAddToInventory>
  );
};

export default AddToInventory;

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
    min-height: 25px;
  }

  .addtoinventory_message_display.success {
    color: green;
  }

  .addtoinventory_message_display.input-error {
    color: red;
  }

  .input_wrapper {
    position: relative;
    &:after {
      border-bottom: 4px dotted var(--brown-black);
      display: block;
      content: '';
      width: 180px;
      height: 4px;
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      bottom: 10px;
    }
  }

  .addtoinventory_input {
    position: relative;
    width: 200px;
    font-size: 1.8rem;
    border-radius: 15px;
    padding: 0 1rem;
    border: none;
    color: var(--brown-black);
    line-height: 4rem;
  }
`;
