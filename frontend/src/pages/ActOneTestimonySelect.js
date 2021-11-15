import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getConversations } from '../store/conversations';

const ActOneTestimonySelect = () => {
  // 34 items needed to go to the trial
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversations());
  }, []);

  let conversations = useSelector((state) => state.conversations.conversations);
  // Above does not return a true array, below converts data to an array with the map method available to it
  conversations = [...conversations];
  const actOneConversations = conversations.filter((conversation) => {
    return conversation.act === 'a';
  });

  const renderCatchphraseButtons = () => {
    return actOneConversations.map((convo) => {
      const name = convo.catchphrase || convo.name;
      return (
        <li key={convo._id} id={convo._id}>
          <Link to={`/testimony/${convo._id}`}>{name}</Link>
        </li>
      );
    });
  };

  return (
    <div>
      <h1>Pick the catchphrase!</h1>
      <ul>
        {renderCatchphraseButtons()}
        <li key={'trial'} id="d2c9e39a-269d-4e45-9762-43156e860643">
          <Link to={`/testimony/d2c9e39a-269d-4e45-9762-43156e860643`}>
            TRIAL!!!
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ActOneTestimonySelect;
