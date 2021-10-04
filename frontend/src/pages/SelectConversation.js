import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  clearItemsFromLocalStorage,
  clearSNotesFromLocalStorage,
} from '../lib/localStorage';
import { getConversations } from '../store/conversations';

const SelectConversation = () => {
  const dispatch = useDispatch();
  let conversations = useSelector((state) => state.conversations.conversations);
  // Above does not return a true array, below converts data to an array with the map method available to it
  conversations = [...conversations];

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

  return (
    <div>
      <button type="button" onClick={clearSNotesFromLocalStorage}>
        Clear Agent S Notes from Inventory
      </button>
      <button type="button" onClick={clearItemsFromLocalStorage}>
        Clear Items from Inventory
      </button>
      <h1>
        UGLY SELECT SCREEN{' '}
        <span role="img" aria-label="image">
          🦝🏝
        </span>
      </h1>
      <ul>{renderConversations()}</ul>
    </div>
  );
};

export default SelectConversation;
