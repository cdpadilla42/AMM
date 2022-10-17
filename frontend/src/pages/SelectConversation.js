import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ImageLoader from '../components/ImageLoader';
import PlayerLetterForm from '../components/PlayerLetterForm';
import {
  clearAllSaveData,
  clearConversationHistory,
  clearItemsFromLocalStorage,
  clearSNotesFromLocalStorage,
  getLastConversationIDFromLocalStorage,
} from '../lib/localStorage';
import { recordMessage } from '../lib/util';
import { addToSNotesList } from '../store/inventory';

const SelectConversation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let conversations = useSelector((state) => state.conversations.conversations);
  // Above does not return a true array, below converts data to an array with the map method available to it
  conversations = [...conversations];

  const [loading, setLoading] = useState(true);

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
    history.nonexistantFunction();
  }

  function handleTest() {
    dispatch(
      addToSNotesList({
        name: "Lucky's Get Well Card",
        completed: false,
        totalCount: 8,
        userEventInstances: [
          'c3d6e35a-1838-4986-829a-ab576e3c8f:45',
          '76508ca2-2cdd-4d7e-a334-f6ba8646e:3',
          '5a208552-f524-46c7-aefc-8eaabc9c8:8',
          'e3bd7c19-386a-4c47-8b51-8f586bab4:8',
          '17e6226f-2d73-4a0b-ad6f-fcf0c3954:7',
          'de4053e3-a6e2-437e-95ef-6e429e8cb:10',
          '71c1dd0d-cbd2-47d6-972d-0775d6ce44:6',
          '946e74fc-a01e-4114-8ccf-90ff8b1181:7',
        ],
      })
    );
  }

  const sendTestMessage = () => {
    const message = window.prompt('write a message');
    recordMessage(message);
  };

  return (
    <ImageLoader disableLoading loading={loading} setLoading={setLoading}>
      <Link to="/act-three">Act Three Select</Link>
      <button type="button" onClick={sendTestMessage}>
        Message Testing Button
      </button>
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
      <PlayerLetterForm />
      <ul>{renderConversations()}</ul>
    </ImageLoader>
  );
};

export default SelectConversation;
