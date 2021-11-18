import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  saveCurrentConversationIdToLocalStorage,
  setLocalStorageToJustBeforeTrial,
} from '../lib/localStorage';
import { getConversations } from '../store/conversations';

const ActOneTestimonySelect = () => {
  const history = useHistory();
  // 34 items needed to go to the trial
  const dispatch = useDispatch();
  const { userHasFullInventory } = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(getConversations());
    saveCurrentConversationIdToLocalStorage('act-one');
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
        <button key={convo._id} data-id={convo._id} onClick={handleButtonClick}>
          {name}
        </button>
      );
    });
  };

  const handlePreTrialClick = () => {
    setLocalStorageToJustBeforeTrial();
  };

  const handleButtonClick = (e) => {
    const conversationID = e.currentTarget.dataset.id;
    history.push(`/testimony/${conversationID}`);
  };

  return (
    <StyledActOneTestimonySelect>
      <div className="page_container">
        {/* <button onClick={handlePreTrialClick}>
          Reset to Pre Trial Inventory
        </button> */}
        <h1>Pick the catchphrase!</h1>
        <div>
          {renderCatchphraseButtons()}
          {userHasFullInventory && (
            <button
              key={'trial'}
              className="trial_button"
              data-id="d2c9e39a-269d-4e45-9762-43156e860643"
              onClick={handleButtonClick}
            >
              TRIAL!!!
            </button>
          )}
        </div>
      </div>
    </StyledActOneTestimonySelect>
  );
};

export default ActOneTestimonySelect;

const StyledActOneTestimonySelect = styled.div`
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  background-color: var(--cream);
  color: var(--brown-black);

  .page_container {
    max-width: 600px;
    margin: 0 auto;
  }

  h1 {
    padding-left: 1rem;
    margin-top: 0;
    padding-top: 1rem;
  }

  button {
    background-color: #8ccfbb;
    border: 4px solid var(--green);
    display: inline-block;
    border-radius: 15px;
    margin: 1rem;
    padding: 1rem;
    color: var(--brown-black);
    font-weight: 700;
    text-decoration: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  button:hover,
  button:active {
    color: var(--cream);
  }

  .trial_button {
    width: 100%;
    background-color: var(--blue);
    border: 4px solid #0b72a2;
    color: var(--cream);
    &:hover {
      border: 4px solid #17b5ff;
    }
  }
`;
