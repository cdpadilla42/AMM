import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { dreamAddress, initiallyLockedConversations } from '../lib/constants';
import {
  saveCurrentConversationIdToLocalStorage,
  setLocalStorageToJustBeforeTrial,
} from '../lib/localStorage';
import { hasRequiredSNotesForFinalTrial } from '../lib/SNotes';
import { recordInteraction } from '../lib/util';
import { getConversations } from '../store/conversations';

const ActThreeTestimonySelect = () => {
  const history = useHistory();
  // 34 items needed to go to the trial
  const dispatch = useDispatch();
  const { conversationsVisited, unlockedConversations, sNotes, userSNotes } =
    useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(getConversations());
    saveCurrentConversationIdToLocalStorage('act-three');
  }, []);
  const [showAll, setShowAll] = useState(false);

  let conversations = useSelector((state) => state.conversations.conversations);
  // Above does not return a true array, below converts data to an array with the map method available to it
  conversations = [...conversations];
  const actThreeConversations = conversations.filter((conversation) => {
    return (
      conversation.act === 'c' &&
      conversation._id !== '656278f2-8610-4a94-93e8-c75acafce071'
    );
  });

  const userHasRequiredSNotes = hasRequiredSNotesForFinalTrial(userSNotes);

  const renderCatchphraseButtons = () => {
    return actThreeConversations.map((convo) => {
      const name = convo.catchphrase || convo.name;
      const thisConvoVisited = conversationsVisited[convo._id];
      // TODO This is where you'll use the constant to look up conversation ids and merge with user's state
      if (
        !showAll &&
        initiallyLockedConversations[convo._id] &&
        !unlockedConversations[convo._id]
      ) {
        return '';
      }

      // Hide Crime Scene
      if (convo._id === '1bb0bef9-dee9-415f-beaa-8570240b8d27') {
        return '';
      }
      return (
        <button key={convo._id} data-id={convo._id} onClick={handleButtonClick}>
          <span>{name}</span>
        </button>
      );
    });
  };

  useEffect(() => {
    if (userHasRequiredSNotes) {
      toast(
        `WOW! You just unlocked the trial! You have enough Agent S Notes completed to nail the culprit!`
      );
    }
  }, [userHasRequiredSNotes]);

  const handlePreTrialClick = () => {
    setLocalStorageToJustBeforeTrial();
  };

  const handleTrialClick = (e) => {
    if (
      window.confirm(
        "Are you sure you want to move on to the trial? There's no going back from here!"
      )
    ) {
      recordInteraction('start act three trial');
      handleButtonClick(e);
    }
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
        {/* <button onClick={() => setShowAll(true)}>Show All</button> */}
        <div>
          {renderCatchphraseButtons()}
          <button
            key="656278f2-8610-4a94-93e8-c75acafce071"
            data-id="656278f2-8610-4a94-93e8-c75acafce071"
            onClick={handleButtonClick}
          >
            <span>🎒</span>
          </button>
          <div className="trial_button_placeholder">
            <span className={userHasRequiredSNotes ? 'strike_through' : ''}>
              Complete Agent S's Notes
            </span>
          </div>
          {userHasRequiredSNotes && (
            <button
              key={'trial'}
              className="trial_button"
              data-id="10a0bd5d-70a1-422a-a02e-11e1078f7000"
              onClick={handleTrialClick}
            >
              TRIAL!!!
            </button>
          )}
          <div className="dream-code">
            <span>Dream Address:</span> <span>{dreamAddress}</span>
          </div>
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

  .dream-code {
    font-size: 1.5rem;
    margin-left: 1rem;
  }
`;
