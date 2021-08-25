import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  switchConversation,
  resetConversationToStart,
  toggleResponseBox,
} from '../store/dialogue';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import { useHistory } from 'react-router-dom';
import throttle from 'lodash.throttle';

const ResponseBox = () => {
  const { responseBoxIsOpen, currentDialogueID, dialogue } = useSelector(
    (state) => state.dialogue
  );
  const dispatch = useDispatch();
  const currentDialogueObj = useCurrentDialogueObj();
  const history = useHistory();
  let currentDialogue;
  if (!currentDialogueID) {
    currentDialogue = dialogue.find((phrases) =>
      phrases.name.includes('Start')
    );
  } else {
    currentDialogue = dialogue.find(
      (phrases) => phrases._id === currentDialogueID
    );
  }
  const responseOptions = currentDialogue?.responseOptions;

  function renderResponseOptions() {
    if (!responseOptions) return;
    console.log(responseOptions);

    return responseOptions.map((optionObj) => (
      <li onClick={() => handleClick(optionObj.followingDialogue?._id)}>
        {optionObj.text}
      </li>
    ));
  }

  function handleClick(followingDialogueID) {
    if (currentDialogueObj?.isFinalDialogue) {
      dispatch(resetConversationToStart());
      history.push('/');
    } else {
      dispatch(switchConversation(followingDialogueID));
    }
  }

  const handleClickButChill = throttle(handleClick, 1000);

  useEffect(() => {
    const responseOptions = currentDialogue?.responseOptions;
    function handleKeydown(e) {
      if (e.code === 'ArrowRight' && responseBoxIsOpen) {
        handleClickButChill(responseOptions[0]?.followingDialogue?._id);
      }
    }

    document.addEventListener('keydown', handleKeydown);

    return () => document.removeEventListener('keydown', handleKeydown);
  });

  return (
    <StyledResponseBox className={responseBoxIsOpen ? '' : 'hide'}>
      <ul>{renderResponseOptions()}</ul>
    </StyledResponseBox>
  );
};

export default ResponseBox;

const StyledResponseBox = styled.div`
  width: 200px;
  background-color: #fff;
  border: 1px solid green;
  position: absolute;
  bottom: calc(50vh - 156px);
  right: calc(50vw - 322px);
  /* transform: translate(-50%, -50%); */

  z-index: 2;
  border-radius: 20px;
  padding: 1rem;
  @media all and (max-width: 420px) {
    height: auto;
    /* width: calc(100% - 4rem); */
    bottom: calc(50vh - 130px);
    right: calc(5vw);
  }

  @media all and (min-height: 900px) and (min-width: 1000px) and (max-width: 1026px) {
    bottom: calc(50vh - 64px);
  }

  &.hide {
    display: none;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 0.3rem 0;
  }
`;
