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
} from '../store/inventory';
import { useHighlightFilter } from '../lib/async-typer';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import Typist from 'react-typist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import ReactHtmlParser from 'react-html-parser';
import {
  addSNoteToLocalStorageInventory,
  updateSNoteInLocalStorageInventory,
} from '../lib/localStorage';

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
    returnToDialoguePositionAfterIncorrect,
  } = useSelector((state) => state.dialogue);
  const {
    items,
    notes: animals,
    userSNotes,
  } = useSelector((state) => state.inventory);
  const { showSNotes } = useSelector((state) => state.notepad);

  const [fromLink, setFromLink] = useState(false);
  const [doneTyping, setDoneTyping] = useState(false);

  const onTypingDone = () => setDoneTyping(true);

  let currentDialogueObj = useCurrentDialogueObj();

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
        console.log('Handling SNote...');
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

  // Add Keyboard listeners to document
  useEffect(() => {
    function handleKeydown(e) {
      if (showSNotes || props.isInventoryOpen) return;
      if (e.code === 'ArrowRight' && !responseBoxIsOpen) {
        // next
        handleNextClick();
      } else if (e.code === 'ArrowLeft') {
        // back
        handlePrevClick();
      }
    }

    document.addEventListener('keyup', handleKeydown);

    return () => document.removeEventListener('keyup', handleKeydown);
  });

  const handleNextClick = () => {
    setDoneTyping(false);
    if (fromLink) setFromLink(false);
    const textEl = textRef.current;
    const isEndOfDialogue =
      currentDialoguePosition === currentDialogueObj.phrase.length - 1;

    const isEndOfDialogueWithResponseOption =
      isEndOfDialogue &&
      currentDialogueObj?.responseOptions?.length &&
      currentDialogueObj?.isFinalDialogue;
    // if there is trailing dialogue...
    if (phrases[currentDialoguePosition].link) {
      // add on to the end of the current text and change emotions
      setFromLink(true);
      props.nextDialogue();
    } else if (isEndOfDialogue && currentDialogueObj.name === 'Incorrect') {
      props.switchConversationFromIncorrect(prevDialogueID);
      props.openInventory();
      props.markUserPromptedForEvidence();
    } else if (isEndOfDialogue && currentDialogueObj.needEvidence) {
      props.toggleInventory();
      props.markUserPromptedForEvidence();
    } else if (
      isEndOfDialogue &&
      currentDialogueObj.isFinalDialogue &&
      !isEndOfDialogueWithResponseOption
    ) {
      props.switchConversation('');
      history.push('/');
    } else if (isEndOfDialogue) {
      props.toggleResponseBox();
    } else {
      props.nextDialogue();
    }
  };

  const handlePrevClick = () => {
    if (currentDialoguePosition === 0) {
    } else {
      props.prevDialogue();
    }
  };

  const renderText = (text) => {
    if (!text) return '';
    const highlightedText = highlightFilter(text);

    const createMarkup = () => {
      return {
        __html: `<p className="text_box__text" >${highlightedText}</p>`,
      };
    };

    return (
      <Typist
        key={text}
        cursor={{ show: false }}
        startDelay={2}
        avgTypingDelay={15}
        onTypingDone={onTypingDone}
      >
        {ReactHtmlParser(highlightedText)}
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
      <div className="text_box__main">
        {renderText(text)}
        <div
          className={`text_box__next_arrow${doneTyping ? '' : ' hidden'}`}
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
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBox);
