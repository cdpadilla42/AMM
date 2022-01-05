import React, { useRef, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';
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
} from '../store/dialogue';
import {
  addToSNotesList,
  updateSNote,
  markUserPromptedForEvidence,
  markUserNotPromptedForEvidence,
  addToConversationsVisited,
} from '../store/inventory';
import { fullRecovery, showHealthBar } from '../store/health';
import { useHighlightFilter } from '../lib/async-typer';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import Typist from 'react-typist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import ReactHtmlParser from 'react-html-parser';
import {
  addConversationAsVisitedToLocalStorage,
  addSNoteToLocalStorageInventory,
  updateSNoteInLocalStorageInventory,
} from '../lib/localStorage';
import { gameStartDialogueID } from '../lib/constants';
import { endInquiryDialogue } from '../store/app';

const TextBox = (props) => {
  const dispatch = useDispatch();
  const textRef = useRef(null);
  const history = useHistory();
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
  } = useSelector((state) => state.dialogue);
  const {
    items,
    notes: animals,
    userSNotes,
  } = useSelector((state) => state.inventory);
  const { showSNotes } = useSelector((state) => state.notepad);
  const { conversation } = useSelector((state) => state.conversations);
  const { inquiryDialogue } = useSelector((state) => state.app);
  const currentTestimonyID = conversation?.[0]?._id;
  const currentAct = conversation?.[0]?.act;

  const [fromLink, setFromLink] = useState(false);
  const [doneTyping, setDoneTyping] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [trailedText, setTrailedText] = useState('');

  const onTypingDone = () => {
    setDoneTyping(true);
  };

  let currentDialogueObj = useCurrentDialogueObj();

  useEffect(() => {
    setTrailedText('');
  }, [currentDialogueObj]);

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
      // If we have all the necessary event data
      if (
        currentPhrase?.sNotesEventTriggered &&
        currentPhrase.sNotesEventType &&
        currentPhrase.sNotesEventRef?.name
      ) {
        // Handle the event
        const {
          sNotesEventType,
          sNotesEventRef: { name, count },
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
          toast(`Added ${name} to Agent S's Notes! 📓`);
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
            toast(`HOORAY! You can check off ${name}!`);
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
              toast(`NICE! You checked off all items for ${name}!`);
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
  console.log('grey', isGrey);
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
    // if there is trailing dialogue...
    if (phrases[currentDialoguePosition].link) {
      // add on to the end of the current text and change emotions
      setFromLink(true);
      setTrailedText(prevText + highlightedTextString + ' ');
      props.nextDialogue();
    } else if (isEndOfDialogue && currentDialogueObj.name === 'Incorrect') {
      props.switchConversationFromIncorrect(prevDialogueID);
      handleOpenInventory();
    } else if (isEndOfDialogue && currentDialogueObj.needEvidence) {
      handleOpenInventory();
    } else if (isEndOfDialogue && inquiryDialogue) {
      // props.endInquiryDialogue();
      props.toggleResponseBox();
    } else if (
      isEndOfDialogue &&
      currentDialogueObj.isFinalDialogue &&
      !isEndOfDialogueWithResponseOption
    ) {
      props.fullRecovery();
      addConversationAsVisitedToLocalStorage(currentTestimonyID);
      props.addToConversationsVisited(currentTestimonyID);
      if (currentTestimonyID === gameStartDialogueID || currentAct === 'a') {
        history.push('/act-one');
      } else if (
        currentTestimonyID === gameStartDialogueID ||
        currentAct === 'c'
      ) {
        if (isLeaving) {
          history.push('/act-three');
        } else {
          props.toggleResponseBox();
        }
      } else {
        history.push('/');
      }
    } else if (isEndOfDialogue) {
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
            phrases?.[currentDialoguePosition]?.speaker.color?.hex || 'grey',
        }}
      >
        {phrases[currentDialoguePosition]?.speaker.name}
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
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBox);
