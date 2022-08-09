import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ImageLoader from '../components/ImageLoader';
import {
  clearAllSaveData,
  clearConversationHistory,
  clearItemsFromLocalStorage,
  clearSNotesFromLocalStorage,
  getLastConversationIDFromLocalStorage,
} from '../lib/localStorage';
import { getConversations } from '../store/conversations';

const SelectConversation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let conversations = useSelector((state) => state.conversations.conversations);
  // Above does not return a true array, below converts data to an array with the map method available to it
  conversations = [...conversations];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getConversations());
  }, []);

  function renderConversations() {
    return conversations.map((convo) => (
      <li key={convo._id} id={convo._id}>
        <Link to={`/testimony/${convo._id}`}>{convo.name}</Link>
      </li>
    ));
  }

  const handleClearConversationHistory = () => {
    toast('Inventory Cleared');
    clearConversationHistory();
  };

  const handleClearInventoryClick = () => {
    toast('Inventory Cleared');
    clearItemsFromLocalStorage();
  };

  const handleClearAllSaveData = () => {
    toast('Inventory Cleared');
    clearAllSaveData();
  };

  const handleClearSNotesClick = () => {
    toast('Agent S Notes Cleared');
    clearSNotesFromLocalStorage();
  };

  function showToast() {
    toast('Toast!');
  }

  function loadFromLastSave() {
    const lastConversationID = getLastConversationIDFromLocalStorage();
    if (!lastConversationID) {
      toast('Something went wrong loading your file!');
    } else {
      if (lastConversationID === 'act-one') {
        history.push(`/${lastConversationID}`);
      } else {
        history.push(`/testimony/${lastConversationID}`);
      }
    }
  }

  function startNewGame() {
    history.push(`/testimony/729d0b36-6021-4843-8e09-da92c651022f`);
  }

  function methodDoesNotExist() {
    foo();
  }

  return (
    <ImageLoader disableLoading loading={loading} setLoading={setLoading}>
      <a href="/act-three">Act Three Select</a>
      <button type="button" onClick={handleClearAllSaveData}>
        Clear All Save Data
      </button>
      <button type="button" onClick={handleClearConversationHistory}>
        Clear Conversation History
      </button>
      <button type="button" onClick={handleClearSNotesClick}>
        Clear Agent S Notes from Inventory
      </button>
      <button type="button" onClick={handleClearInventoryClick}>
        Clear Items from Inventory
      </button>
      <button type="button" onClick={showToast}>
        Toast! 🍞
      </button>
      <button type="button" onClick={loadFromLastSave}>
        Load from last Save 💾
      </button>
      <button type="button" onClick={startNewGame}>
        Start new Game 🍃
      </button>
      <button onClick={methodDoesNotExist}>Break the world</button>;
      <h1>
        UGLY SELECT SCREEN{' '}
        <span role="img" aria-label="image">
          🦝🏝
        </span>
      </h1>
      <ul>{renderConversations()}</ul>
    </ImageLoader>
  );
};

export default SelectConversation;
