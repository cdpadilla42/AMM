import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSNotes,
  initializeUserInventoryFromLocalStorage,
} from '../store/inventory';
import { closeSNotes, toggleSNotes } from '../store/notepad';

const SNotes = () => {
  const { userSNotes, sNotes } = useSelector((state) => state.inventory);
  const { showSNotes } = useSelector((state) => state.notepad);
  const [sNotesToRender, setSNotesToRender] = useState([]);
  const dispatch = useDispatch();

  // // TODO Remove when integrating
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(initializeUserInventoryFromLocalStorage());
  //   dispatch(getSNotes());
  // }, []);

  const sNotesLoaded = userSNotes && userSNotes.length;
  const sNotesDictLoaded = sNotes && sNotes.length;

  useEffect(() => {
    if (sNotesLoaded && sNotesDictLoaded) {
      const res = [];
      userSNotes.forEach((userSNote) => {
        const matchedSNote = sNotes.find(
          (sNote) => sNote.name === userSNote.name
        );
        const resSNote = { ...matchedSNote };
        resSNote.completed = userSNote.completed;
        resSNote.userCount = userSNote.userEventInstances?.length;
        res.push(resSNote);
      });
      setSNotesToRender(res);
    }
  }, [sNotesLoaded, sNotesDictLoaded]);

  console.log(sNotesToRender);

  const renderSNotes = () => {
    return sNotesToRender.map((sNote) => (
      <div className="note" key={sNote.name}>
        {sNote.completed ? '👍' : '☐'} {sNote.description}
      </div>
    ));
  };

  const toggleNotes = () => dispatch(toggleSNotes());

  const onOutsideClick = (e) => {
    console.log('reading...');
    if (e.currentTarget === e.target) dispatch(closeSNotes());
  };

  return (
    <StyledSNotes onClick={onOutsideClick} showSNotes={showSNotes}>
      <div className={`notepad_wrapper ${showSNotes ? '' : 'off_screen'}`}>
        <div className="notepad_sheet">
          <button
            className="notepad_button"
            type="button"
            aria-label="Open Agent S's Notes"
            onClick={toggleNotes}
          >
            📝
          </button>
        </div>
        <div className="notepad">{renderSNotes()}</div>
      </div>
    </StyledSNotes>
  );
};

export default SNotes;

const StyledSNotes = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  transition: background-color 0.8s ease;
  z-index: 100;
  overflow-x: hidden;

  ${(props) =>
    props.showSNotes
      ? 'background-color: rgba(0, 0, 0, 0.1);'
      : 'background-color: rgba(0,0,0,0);'};
  ${(props) => (props.showSNotes ? '' : 'pointer-events: none')};

  .notepad_wrapper {
    position: absolute;
    right: 0;
    transition: transform 0.8s cubic-bezier(0.47, -0.51, 0.46, 1.64);
    pointer-events: all;

    &.off_screen {
      transform: translateX(300px);
    }
  }

  .notepad {
    width: 250px;
    position: relative;
    right: 0;
    padding: 1rem;
    top: 24px;
    max-height: 85vh;
    overflow: scroll;
  }

  .notepad_sheet {
    background-color: #fff;
    width: 350px;
    height: 90vh;
    transform: rotate(-3deg);
    position: absolute;
    right: -70px;
    top: 24px;
  }

  .notepad_button {
    border: none;
    width: 50px;
    height: 50px;
    background-color: blue;
    position: relative;
    right: 50px;
  }
`;
