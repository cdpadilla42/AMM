import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  switchConversation,
  resetConversationToStart,
  toggleResponseBox,
  setLeaving,
  openInventory,
} from '../store/dialogue';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import { useHistory, useParams } from 'react-router-dom';
import { gameStartDialogueID } from '../lib/constants';
import { inquiryModeResponses } from '../lib/inquiryModeResponses';
import { markUserPromptedForEvidence } from '../store/inventory';
import { startInquiryMode } from '../store/app';
import { useMemo } from 'react';

const ResponseBox = () => {
  const params = useParams();
  const { responseBoxIsOpen, currentDialogueID, dialogue } = useSelector(
    (state) => state.dialogue
  );
  const { conversation } = useSelector((state) => state.conversations);
  const playersAct3Scenes = useSelector((state) => state.act3Scenes);
  const currentTestimonyID = conversation?.[0]?._id;
  const act = conversation?.[0]?.act;
  const currentAct3SceneObject = playersAct3Scenes[params.id];

  const dispatch = useDispatch();
  const currentDialogueObj = useCurrentDialogueObj();
  const history = useHistory();
  const currentDialogue = useMemo(() => {
    if (!currentDialogueID) {
      return dialogue.find((phrases) => phrases.name.includes('Start'));
    } else {
      return dialogue.find((phrases) => phrases._id === currentDialogueID);
    }
  }, [currentDialogueID, dialogue]);

  const responseOptions = currentDialogue?.responseOptions;
  console.log({ responseOptions, currentDialogue });

  function renderResponseOptions() {
    if (
      !responseOptions &&
      act === 'c' &&
      currentAct3SceneObject?.name === 'Freemode'
    ) {
      return inquiryModeResponses.map((optionObj) => {
        const responseOnClick = () => {
          if (optionObj.openInventoryForInquiry) {
            // open inventory
            dispatch(openInventory());
            dispatch(startInquiryMode());
          } else if (optionObj.switchToFarewellDialogue) {
            // find and switch to that dialogue
            const farewellDialogue = dialogue.find(
              (phrases) => phrases.name === 'Bye'
            );
            dispatch(switchConversation(farewellDialogue._id));
            dispatch(setLeaving());
          }
        };
        return (
          <li key={optionObj.text} onClick={responseOnClick}>
            <span>{optionObj.text}</span>
          </li>
        );
      });
    }
    if (!responseOptions) return null;
    return responseOptions.map((optionObj) => {
      const blankSpacerTextForHighlight = optionObj.text.replace(
        /[\s\S]*/,
        ' '
      );

      return (
        <li
          key={optionObj.text}
          onClick={() => handleClick(optionObj.followingDialogue?._id)}
        >
          <span>{optionObj.text}</span>
        </li>
      );
    });
  }

  function handleClick(followingDialogueID) {
    if (currentDialogueObj?.isFinalDialogue) {
      dispatch(resetConversationToStart());
      if (currentTestimonyID === gameStartDialogueID) {
        history.push('/act-one');
      } else {
        history.push('/');
      }
    } else {
      dispatch(switchConversation(followingDialogueID));
    }
  }

  useEffect(() => {
    const responseOptions = currentDialogue?.responseOptions;
    function handleKeydown(e) {
      if (
        (e.code === 'ArrowRight' || e.code === 'Enter') &&
        responseBoxIsOpen &&
        responseOptions?.[0]?.followingDialogue?._id
      ) {
        handleClick(responseOptions[0]?.followingDialogue?._id);
      }
    }

    document.addEventListener('keyup', handleKeydown);

    return () => document.removeEventListener('keyup', handleKeydown);
  });

  return (
    <StyledResponseBox className={responseBoxIsOpen ? '' : 'hide'}>
      <ul>{renderResponseOptions()}</ul>
    </StyledResponseBox>
  );
};

export default ResponseBox;

const StyledResponseBox = styled.div`
  width: 600px;
  position: absolute;
  top: calc(var(--vh, 1vh) * 50 - 300px);
  /* bottom: calc(50vh - 156px); */
  /* right: calc(50vw - 322px); */
  font-size: 1.1rem;
  font-weight: 700;
  z-index: 150;
  @media all and (max-width: 800px) {
    width: 80%;
    top: calc(var(--vh, 1vh) * 50 - 200px);
  }
  @media all and (max-width: 420px) {
    height: auto;
    /* width: calc(100% - 4rem); */
    /* bottom: calc(50vh - 130px); */
    /* right: calc(5vw); */
  }

  @media all and (min-height: 900px) and (min-width: 1000px) and (max-width: 1026px) {
    /* bottom: calc(50vh - 64px); */
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
    display: block;
    background-color: var(--cream);
    color: var(--brown-black);
    border: 2px solid var(--brown-black);
    padding: 1rem;
    border-radius: 50px;
    margin: 0.5rem 0;
    &:hover,
    &:active {
      cursor: pointer;
      span {
        background-image: linear-gradient(to top, #ffcb66 40%, transparent 0);
      }
    }

    &:after {
      content: attr(data-highlight-space);
      padding: 5px 15px;
      border-radius: 10px;
      transition: all 0.5s ease;
    }
  }
`;
