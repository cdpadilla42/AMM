import React, { useRef, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';
import {
  nextDialogue,
  prevDialogue,
  toggleResponseBox,
  toggleInventory,
  switchConversation,
  resetConversationToStart,
} from '../store/dialogue';
import { addToSNotesList, updateSNote } from '../store/inventory';
import { useHighlightFilter } from '../lib/async-typer';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import Typist from 'react-typist';
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
  } = useSelector((state) => state.dialogue);
  const {
    items,
    notes: animals,
    userSNotes,
  } = useSelector((state) => state.inventory);

  const [fromLink, setFromLink] = useState(false);

  let currentDialogueObj = useCurrentDialogueObj();

  const highlightFilter = useHighlightFilter({ items, animals });

  const phrases = currentDialogueObj && currentDialogueObj.phrase;
  // const responseOptions = currentDialogueObj
  //   ? currentDialogueObj.responseOptions
  //   : null;

  const currentPhrase = phrases[currentDialoguePosition];

  const userHasSNote = (sNoteName) => {
    return !!userSNotes.find((userSNote) => userSNote.name === sNoteName);
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
        if (sNotesEventType === 'Add') {
          // Construct the sNote object
          const sNote = {
            name,
            completed: false,
          };
          // If event is already stored, return
          if (userHasSNote(name)) return;
          if (count) {
            sNote.totalCount = count;
            sNote.userEventInstances = [];
          }
          // store into redux
          dispatch(addToSNotesList(sNote));
          // store into local storage
          addSNoteToLocalStorageInventory(sNote);
          // show event message
          console.log(`Added ${name} to Agent S's Notes! 📓`);
        } else if (sNotesEventType === 'Complete') {
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
            console.log(`HOORAY! You can check off ${name}!`);
            // if there IS a total count
          } else {
            const updatedSNote = { ...userSNotes[userSNoteIndex] };
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
            updateSNoteByIndex(updatedSNote, userSNoteIndex);
            // show message
            if (updatedSNote.userEventInstances.length === count) {
              console.log(`NICE! You checked off all items for ${name}!`);
            } else {
              console.log(`Alright! One item checked off for ${name}!`);
            }
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
      props.switchConversation(prevDialogueID);
    } else if (isEndOfDialogue && currentDialogueObj.needEvidence) {
      props.toggleInventory();
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
            phrases[currentDialoguePosition]?.speaker.color?.hex || 'grey',
        }}
      >
        {phrases[currentDialoguePosition]?.speaker.name}
      </div>
      <div className="text_box__main">
        {renderText(text)}
        <button className="text_box__left_arrow" onClick={handlePrevClick}>
          Back
        </button>
        <button className="text_box__right_arrow" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      nextDialogue,
      prevDialogue,
      toggleResponseBox,
      toggleInventory,
      switchConversation,
      resetConversationToStart,
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(TextBox);
