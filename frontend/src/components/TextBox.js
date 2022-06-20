import React, { useRef, useEffect, useState, useMemo } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  nextDialogue,
  prevDialogue,
  openInventory,
  toggleResponseBox,
  toggleInventory,
  switchConversation,
  switchConversationFromIncorrect,
  resetConversationToStart,
  jumpToDialoguePositionAndConversation,
} from '../store/dialogue';
import {
  addToSNotesList,
  updateSNote,
  markUserPromptedForEvidence,
  markUserNotPromptedForEvidence,
  addToConversationsVisited,
  removeFromInventory,
  addToInventory,
  addToPrereqs,
} from '../store/inventory';
import { fullRecovery, showHealthBar } from '../store/health';
import { addAct2TrialJuliantestimonyDialogue } from '../store/specialEvents';
import { updateScenes } from '../store/act3Scenes';
import { useHighlightFilter } from '../lib/async-typer';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import Typist from 'react-typist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import ReactHtmlParser from 'react-html-parser';
import {
  addConversationAsVisitedToLocalStorage,
  addItemToLocalStorageInventory,
  addPrereqToLocalStorage,
  addSNoteToLocalStorageInventory,
  removeItemToLocalStorageInventory,
  saveNewAct3SceneToLocalStorage,
  updateSNoteInLocalStorageInventory,
} from '../lib/localStorage';
import {
  act3Scenes,
  connectedConversations,
  dialoguesThatUnlockConversations,
  gameStartDialogueID,
  lastActTwoDialogueID,
  requiredDialoguesInJulianTrial2,
  trialTestimonyConversationIDs,
} from '../lib/constants';
import {
  endInquiryDialogue,
  startInquiryMode,
  startFreeMode,
  endInquiryMode,
} from '../store/app';
import sceneUnlockingHandler from '../lib/sceneUnlockingHandler';
import { isDeadEndDialogue } from '../lib/util';
import { useUnlockConversation } from '../hooks/useSaveUtility';

const TextBox = (props) => {
  const dispatch = useDispatch();
  const unlockConversation = useUnlockConversation();
  const textRef = useRef(null);
  const history = useHistory();
  const { id: conversationID } = useParams();
  const {
    dialogue,
    currentDialoguePosition,
    currentDialogueName,
    currentDialogueID,
    prevDialogueID,
    responseBoxIsOpen,
    isInventoryOpen,
    isLeaving,
    returnToDialoguePositionAfterIncorrect,
    storedDialoguePosition,
  } = useSelector((state) => state.dialogue);
  const {
    items,
    notes: animals,
    userSNotes,
  } = useSelector((state) => state.inventory);
  const { showSNotes } = useSelector((state) => state.notepad);
  const { conversation } = useSelector((state) => state.conversations);
  const { inquiryDialogue, freeMode, inquiryMode } = useSelector(
    (state) => state.app
  );
  const { returnDialogue } = useSelector((state) => state.inquiry);
  const { act2TrialJulianTestimonyDialoguesPassed } = useSelector(
    (state) => state.specialEvent
  );
  const playersAct3Scenes = useSelector((state) => state.act3Scenes);
  const currentTestimonyID = conversation?.[0]?._id;
  const currentAct = conversation?.[0]?.act;

  const [fromLink, setFromLink] = useState(false);
  const [doneTyping, setDoneTyping] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [trailedText, setTrailedText] = useState('');
  const [currentDialogueIDState, setCurrentDialogueIDState] = useState('');

  console.log(currentDialogueIDState);

  const currentAct3SceneObject = playersAct3Scenes[conversationID];
  const conversationSceneOrder = act3Scenes[conversationID]?.sceneOrder;
  const currentSceneIndex = useMemo(() => {
    if (conversationSceneOrder && currentAct3SceneObject?.scene) {
      return conversationSceneOrder.findIndex(
        (scene) => scene.dialogueID === currentAct3SceneObject?.scene.dialogueID
      );
    }
    return 0;
  }, [conversationSceneOrder]);
  const onTypingDone = () => {
    setDoneTyping(true);
  };

  const currentDialogueObj = useCurrentDialogueObj();

  const useLastAvailableEvidenceList =
    currentDialogueObj?.useLastAvailableEvidenceList;

  const responseOptions = currentDialogueObj?.responseOptions;

  const switchToInquiryMode = currentDialogueObj?.switchToInquiryMode;

  useEffect(() => {
    setTrailedText('');
  }, [currentDialogueObj]);

  const checkForUnlockedDialogue = () => {
    const unlockedDialogue =
      dialoguesThatUnlockConversations[currentDialogueIDState];
    console.log({ currentDialogueIDState, unlockedDialogue });
    if (unlockedDialogue) {
      unlockConversation(unlockedDialogue);
    }
  };

  useEffect(() => {
    let newDialogueID;
    if (currentDialogueID) {
      newDialogueID = currentDialogueID;
    } else {
      newDialogueID = dialogue.find((dialogue) =>
        dialogue?.name?.includes('Start')
      )?._id;
    }
    setCurrentDialogueIDState(newDialogueID);
    checkForUnlockedDialogue();
  }, [currentDialogueID, dialogue]);

  const highlightFilter = useHighlightFilter({ items, animals });

  const phrases = currentDialogueObj && currentDialogueObj.phrase;
  // const responseOptions = currentDialogueObj
  //   ? currentDialogueObj.responseOptions
  //   : null;

  const currentPhrase = phrases?.[currentDialoguePosition] || {};

  const getUserSNote = (sNoteName) => {
    return userSNotes.find((userSNote) => userSNote.name === sNoteName);
  };

  const updateSNoteByIndex = (updatedSNote, userSNoteIndex) => {
    // redux
    dispatch(updateSNote({ sNote: updatedSNote, index: userSNoteIndex }));
    // update local storage
    updateSNoteInLocalStorageInventory(updatedSNote, userSNoteIndex);
  };

  const handleSNotesEvent = () => {
    // If currentPhrase data available
    if (currentPhrase && Object.keys(currentPhrase).length) {
      // Prereq handling
      if (
        currentPhrase?.prereqEventTriggered &&
        currentPhrase.prereqEventRef?.name
      ) {
        addPrereqToLocalStorage(currentPhrase.prereqEventRef?.name);
        // add to redux
        dispatch(addToPrereqs(currentPhrase.prereqEventRef.name));
        toast(
          `🎉  Great! ${currentPhrase.prereqEventRef.name.toUpperCase()} was added to Prereqs.`
        );
      }
      // Item handling
      if (
        currentPhrase?.itemEventTriggered &&
        currentPhrase.itemEventType &&
        currentPhrase.itemEventRef?.name
      ) {
        const {
          itemEventType,
          itemEventRef: { name },
        } = currentPhrase;
        if (itemEventType === 'Add') {
          addItemToLocalStorageInventory(name);
          // add to redux
          dispatch(addToInventory(name));
          toast(
            `🔎  Great! ${name.toUpperCase()} was added to the evidence file.`
          );
        } else {
          // REMOVE ITEM
          removeItemToLocalStorageInventory(name);
          dispatch(removeFromInventory(name));
          toast(`${name.toUpperCase()} was taken!`);
        }
      }
      // If we have all the necessary event data
      if (
        currentPhrase?.sNotesEventTriggered &&
        currentPhrase.sNotesEventType &&
        currentPhrase.sNotesEventRef?.name
      ) {
        // Handle the event
        const {
          sNotesEventType,
          sNotesEventRef: { name, count, successMessage, hidden, achievement },
        } = currentPhrase;
        const userSNote = getUserSNote(name);
        if (sNotesEventType === 'Add') {
          // Construct the sNote object
          const sNote = {
            name,
            completed: false,
          };
          // If event is already stored, return
          if (userSNote) return;
          if (count) {
            sNote.totalCount = count;
            sNote.userEventInstances = [];
          }
          // store into redux
          dispatch(addToSNotesList(sNote));
          // store into local storage
          addSNoteToLocalStorageInventory(sNote);
          // show event message
          if (!hidden && !achievement) {
            toast(`Added ${name} to Agent S's Notes! 📓`);
          }
          // If this is a completion event and the user has the note and it has not been completed
        } else if (
          sNotesEventType === 'Complete' &&
          userSNote &&
          !userSNote.completed
        ) {
          // Find the index of the matching user's SNote
          const userSNoteIndex = userSNotes.findIndex(
            (userSNote) => userSNote.name === name
          );
          const sNoteDialoguePositionID = `${
            currentDialogueID ?? text
          }:${currentDialoguePosition}`;
          // if there is no totalCount, mark the sNote completed
          if (!count) {
            const updatedSNote = { ...userSNotes[userSNoteIndex] };
            // update the SNote
            updatedSNote.completed = true;
            // update userSNotes
            updateSNoteByIndex(updatedSNote, userSNoteIndex);
            // show message
            toast(successMessage || `HOORAY! You can check off ${name}!`);
            // if there IS a total count
          } else {
            const updatedSNote = { ...userSNotes[userSNoteIndex] };
            const newCountForNote = updatedSNote.userEventInstances.length + 1;
            // if the sNote doesn't have this phrase ID stored in sNote.userEventInstances
            if (
              updatedSNote.userEventInstances.find(
                (userSNote) => userSNote === sNoteDialoguePositionID
              )
            )
              return;
            // add to userEventInstances
            const newUserEventInstances = [...updatedSNote.userEventInstances];
            newUserEventInstances.push(sNoteDialoguePositionID);
            updatedSNote.userEventInstances = newUserEventInstances;
            // Update userSNotes

            // show message
            if (newCountForNote === count) {
              toast(
                successMessage || `NICE! You checked off all items for ${name}!`
              );
              updatedSNote.completed = true;
            } else {
              toast(
                `Alright! ${newCountForNote} out of ${count} items checked off for ${name}!`
              );
            }
            updateSNoteByIndex(updatedSNote, userSNoteIndex);
          }
        }
      }
    }
  };

  // Handle sNotes Event
  useEffect(() => {
    handleSNotesEvent();
  }, [currentPhrase]);

  const text = currentPhrase?.text;
  const isGrey = currentPhrase?.isGrey;
  // On change effect
  useEffect(() => {
    // const textEl = textRef.current;
    // draw(textEl, text, { isTrailing: fromLink });
  }, [
    dialogue,
    currentDialoguePosition,
    currentDialogueName,
    currentDialogueID,
  ]);

  const highlightedTextString = highlightFilter(text);

  const highlightedTextHTML = ReactHtmlParser(highlightedTextString);

  // Add Keyboard listeners to document
  useEffect(() => {
    function handleKeydown(e) {
      if (showSNotes || props.isInventoryOpen) return;
      if (
        (e.code === 'Enter' || e.code === 'ArrowRight') &&
        !responseBoxIsOpen
      ) {
        if (doneTyping) {
          // next
          handleNextClick();
        } else {
          setShowFullText(true);
          setDoneTyping(true);
        }
      } else if (e.code === 'ArrowLeft') {
        // back
        handlePrevClick();
      }
    }

    document.addEventListener('keyup', handleKeydown);

    return () => document.removeEventListener('keyup', handleKeydown);
  });

  const handleOpenInventory = () => {
    props.openInventory(currentDialogueObj.requiredEvidence?.[0]._type);
    props.markUserPromptedForEvidence();
    // if the boolean is on, show health bar
    if (currentDialogueObj.loseHealthOnIncorrect) {
      props.showHealthBar();
    }
  };

  const handleNextClick = (e) => {
    if (e) {
      e.stopPropagation();
    }
    if (fromLink) setFromLink(false);
    const textEl = textRef.current;
    const prevText = trailedText;
    const isEndOfDialogue =
      currentDialoguePosition === currentDialogueObj.phrase.length - 1;
    if (!isEndOfDialogue) {
      setTrailedText('');
    }
    const isEndOfDialogueWithResponseOption =
      isEndOfDialogue &&
      currentDialogueObj?.responseOptions?.length &&
      currentDialogueObj?.isFinalDialogue;

    const trialTestimonyReturningDialogueID =
      trialTestimonyConversationIDs[conversationID];
    const isEndOfDialogueInTrialTestimony =
      isEndOfDialogue && trialTestimonyReturningDialogueID;
    // if there is trailing dialogue...
    if (!isEndOfDialogue && phrases[currentDialoguePosition].link) {
      // add on to the end of the current text and change emotions
      setFromLink(true);
      setTrailedText(prevText + highlightedTextString + ' ');
      props.nextDialogue();
    } else if (isEndOfDialogue && currentDialogueObj.name === 'Incorrect') {
      props.switchConversationFromIncorrect(prevDialogueID);
      handleOpenInventory();
    } else if (isEndOfDialogueInTrialTestimony) {
      if (
        currentDialogueObj.needEvidence ||
        currentDialogueObj.multiBranchEvidence
      ) {
        handleOpenInventory();
      } else if (
        // Act 2 Julian
        currentDialogueID === '966777cd-6fe8-4306-94b6-6cbdff81039e' ||
        currentDialogueID === null
      ) {
        // check if the objects match keys
        let hasUserPassedAllRequiredDialoguesTrial2 = true;
        Object.keys(requiredDialoguesInJulianTrial2).forEach((dialogue) => {
          if (!act2TrialJulianTestimonyDialoguesPassed[dialogue]) {
            hasUserPassedAllRequiredDialoguesTrial2 = false;
          }
        });
        if (!hasUserPassedAllRequiredDialoguesTrial2) {
          // handle diverging paths, either agent S loop
          props.jumpToDialoguePositionAndConversation({
            position: 0,
            dialogueID: '75f01638-63e4-4cc7-8e7d-f39a1f3e9036',
          });
        } else {
          // Or moving forward
          const nextConversationID = connectedConversations[conversationID];
          history.push(`/testimony/${nextConversationID}`);
        }
      } else {
        // Save dialogue if needed as passed
        if (requiredDialoguesInJulianTrial2[currentDialogueID]) {
          props.addAct2TrialJuliantestimonyDialogue({
            [currentDialogueID]:
              requiredDialoguesInJulianTrial2[currentDialogueID],
          });
        }
        // switch back to prev dialogue and position
        let returningDialoguePosition = storedDialoguePosition + 1;
        if (currentDialogueID === '75f01638-63e4-4cc7-8e7d-f39a1f3e9036') {
          returningDialoguePosition = 0;
        }
        props.jumpToDialoguePositionAndConversation({
          position: returningDialoguePosition,
          dialogueID: trialTestimonyReturningDialogueID,
        });
      }
    } else if (
      isEndOfDialogue &&
      (currentDialogueObj.needEvidence ||
        currentDialogueObj.multiBranchEvidence)
    ) {
      handleOpenInventory();
    } else if (isEndOfDialogue && inquiryDialogue) {
      props.endInquiryDialogue();
      props.toggleResponseBox();
      props.jumpToDialoguePositionAndConversation({
        position: returnDialogue.currentDialogueID,
        dialogueID: returnDialogue.currentDialoguePosition,
      });
    } else if (
      isEndOfDialogue &&
      currentDialogueObj.isFinalDialogue &&
      !isEndOfDialogueWithResponseOption
    ) {
      props.fullRecovery();
      addConversationAsVisitedToLocalStorage(currentTestimonyID);
      props.addToConversationsVisited(currentTestimonyID);
      if (isEndOfDialogue && connectedConversations[conversationID]) {
        history.push(`/testimony/${connectedConversations[conversationID]}`);
      } else if (
        currentTestimonyID === gameStartDialogueID ||
        currentAct === 'a'
      ) {
        history.push('/act-one');
      } else if (
        currentTestimonyID === lastActTwoDialogueID ||
        currentAct === 'b'
      ) {
        history.push('/act-three');
      } else if (currentAct === 'c') {
        // if current scene state is free mode
        if (currentAct3SceneObject?.name === 'Freemode' || freeMode) {
          if (isLeaving) {
            history.push('/act-three');
          } else {
            props.toggleResponseBox();
          }
        } else {
          // normal leaving procedure. Save new scene state here
          const currentScene = conversationSceneOrder[currentSceneIndex];
          const nextScene = conversationSceneOrder[currentSceneIndex + 1];
          if (
            nextScene &&
            !currentScene.haltMovingSceneForwardAtEndOfDialogue &&
            !isDeadEndDialogue(currentDialogueID)
          ) {
            saveNewAct3SceneToLocalStorage(conversationID, nextScene);
            props.updateScenes({
              conversationID,
              upcomingScene: nextScene,
            });
          }

          const sceneUnlockingHandlerObj = sceneUnlockingHandler(
            currentDialogueIDState
          );
          if (sceneUnlockingHandlerObj) {
            const { updateReduxSceneObj } = sceneUnlockingHandlerObj;
            if (updateReduxSceneObj) props.updateScenes(updateReduxSceneObj);
          }

          checkForUnlockedDialogue();

          history.push('/act-three');
        }
      } else {
        history.push('/');
      }
    } else if (isEndOfDialogue && useLastAvailableEvidenceList) {
      handleOpenInventory();
    } else if (isEndOfDialogue && switchToInquiryMode) {
      props.toggleResponseBox();
      props.startFreeMode();
      const nextScene = conversationSceneOrder[currentSceneIndex + 1];
      if (nextScene) {
        saveNewAct3SceneToLocalStorage(conversationID, nextScene);
        props.updateScenes({
          conversationID,
          upcomingScene: nextScene,
        });
      }
    } else if (isEndOfDialogue && responseOptions) {
      props.toggleResponseBox();
    } else {
      setDoneTyping(false);
      setShowFullText(false);
      props.nextDialogue();
    }
  };

  const handlePrevClick = () => {
    if (currentDialoguePosition === 0) {
    } else {
      props.prevDialogue();
    }
  };

  const handleTextBoxClick = () => {
    if (doneTyping) {
      // next
      handleNextClick();
    } else {
      setShowFullText(true);
      setDoneTyping(true);
    }
  };

  const renderText = (text) => {
    if (!text) return '';

    // const createMarkup = () => {
    //   return {
    //     __html: `<p className="text_box__text" >${highlightedText}</p>`,
    //   };
    // };

    return (
      <Typist
        key={text}
        cursor={{ show: false }}
        startDelay={2}
        avgTypingDelay={15}
        onTypingDone={onTypingDone}
      >
        {highlightedTextHTML}
      </Typist>
    );
  };

  return (
    <div className="text_box">
      <div
        className="text_box__name"
        style={{
          backgroundColor:
            phrases?.[currentDialoguePosition]?.speaker?.color?.hex || 'grey',
          height: '48px',
          boxSizing: 'border-box',
        }}
      >
        {phrases?.[currentDialoguePosition]?.speaker.name || '?????'}
      </div>
      <div
        className={`text_box__main${isGrey ? ' grey' : ''}`}
        onClick={handleTextBoxClick}
      >
        {ReactHtmlParser(trailedText)}
        {showFullText ? highlightedTextHTML : renderText(text)}
        <div
          className={`text_box__next_arrow${
            doneTyping && !isInventoryOpen ? '' : ' hidden'
          }`}
          onClick={handleNextClick}
        >
          <FontAwesomeIcon icon={faCaretDown} color="#ffb500" size="2x" />
        </div>
        {/* <button className="text_box__left_arrow" onClick={handlePrevClick}>
          Back
        </button>
        <button className="text_box__right_arrow" onClick={handleNextClick}>
          Next
        </button> */}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const { dialogue } = state;
  return { isInventoryOpen: dialogue.isInventoryOpen };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      nextDialogue,
      prevDialogue,
      toggleResponseBox,
      openInventory,
      toggleInventory,
      switchConversation,
      switchConversationFromIncorrect,
      resetConversationToStart,
      markUserNotPromptedForEvidence,
      markUserPromptedForEvidence,
      showHealthBar,
      fullRecovery,
      addToConversationsVisited,
      endInquiryDialogue,
      updateScenes,
      startInquiryMode,
      startFreeMode,
      endInquiryMode,
      jumpToDialoguePositionAndConversation,
      addAct2TrialJuliantestimonyDialogue,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBox);
