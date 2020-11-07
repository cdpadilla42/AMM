import React, { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
    console.log(conversations);

    return conversations.map((convo) => (
      <li key={convo._id} id={convo._id}>
        {convo.name}
      </li>
    ));
  }

  return (
    <div>
      <Link to="/testimony">To the testimony!</Link>
      <ul>{renderConversations()}</ul>
    </div>
  );
};

export default SelectConversation;
