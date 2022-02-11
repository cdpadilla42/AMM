import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { initiallyLockedConversations } from '../lib/constants';
import {
  saveCurrentConversationIdToLocalStorage,
  setLocalStorageToJustBeforeTrial,
} from '../lib/localStorage';
import { getConversations } from '../store/conversations';

const ActThreeTestimonySelect = () => {
  const history = useHistory();
  // 34 items needed to go to the trial
  const dispatch = useDispatch();
  const { userHasFullInventory, conversationsVisited, unlockedConversations } =
    useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(getConversations());
    saveCurrentConversationIdToLocalStorage('act-one');
  }, []);

  let conversations = useSelector((state) => state.conversations.conversations);
  // Above does not return a true array, below converts data to an array with the map method available to it
  conversations = [...conversations];
  const actThreeConversations = conversations.filter((conversation) => {
    return conversation.act === 'c';
  });

  const renderCatchphraseButtons = () => {
    return actThreeConversations.map((convo) => {
      const name = convo.catchphrase || convo.name;
      const thisConvoVisited = conversationsVisited[convo._id];
      // TODO This is where you'll use the constant to look up conversation ids and merge with user's state
      if (
        initiallyLockedConversations[convo._id] &&
        !unlockedConversations[convo._id]
      ) {
        return '';
      }
      return (
        <button key={convo._id} data-id={convo._id} onClick={handleButtonClick}>
          <span className={thisConvoVisited ? 'strike_through' : ''}>
            {name}
          </span>
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
        <h1>Pick a villager!</h1>
        <div>
          {renderCatchphraseButtons()}
          <div className="trial_button_placeholder">
            <span>Talk to Villagers</span>
            {/* <span className={userHasFullInventory ? 'strike_through' : ''}>
              Get Evidence
            </span> */}
          </div>
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

export default ActThreeTestimonySelect;

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
    width: calc(100% - 2rem);
    background-color: var(--blue);
    border: 4px solid #0b72a2;
    color: var(--cream);
    &:hover {
      border: 4px solid #17b5ff;
    }
  }

  .trial_button_placeholder {
    display: flex;
    background-color: #8ccfbb;
    border: 4px solid var(--green);
    border-radius: 15px;
    margin: 1rem;
    padding: 1rem;
    color: var(--brown-black);
    font-weight: 700;
    text-decoration: none;
    font-size: 1.5rem;
    cursor: pointer;
    width: calc(100% - 2rem);
    background-color: #e3e3e3;
    border: 4px dashed #616161;
    color: #584f41;
    justify-content: center;

    & > * {
      flex: 1;
      text-align: center;
    }
  }

  .strike_through {
    text-decoration: line-through;
    text-decoration-thickness: 0.3rem;
  }
`;
