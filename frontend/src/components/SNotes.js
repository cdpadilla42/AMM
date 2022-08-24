import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { closeSNotes, toggleSNotes } from '../store/notepad';
import { useParams } from 'react-router';

const SNotes = () => {
  const { userSNotes, sNotes } = useSelector((state) => state.inventory);
  const { showSNotes } = useSelector((state) => state.notepad);
  const [sNotesToRender, setSNotesToRender] = useState([]);
  const currentAct = useSelector(
    (state) => state.conversations?.conversation?.[0]?.act
  );
  const dispatch = useDispatch();

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
  }, [sNotesLoaded, sNotesDictLoaded, userSNotes]);

  // If the intro dialogue, or act I/II don't show
  const params = useParams();
  if (
    params.id === '729d0b36-6021-4843-8e09-da92c651022f' ||
    currentAct === 'a' ||
    currentAct === 'b'
  ) {
    return null;
  }

  const renderSNotes = () => {
    return sNotesToRender.map((sNote) => {
      if (!sNote.hidden) {
        return (
          <div className="note" key={sNote.name} dataset-key={sNote.name}>
            {sNote.completed ? '✓' : '☐'} {sNote.description}
          </div>
        );
      } else {
        return '';
      }
    });
  };

  const toggleNotes = () => dispatch(toggleSNotes());

  const onOutsideClick = (e) => {
    if (e.currentTarget === e.target) dispatch(closeSNotes());
  };

  return (
    <StyledSNotes>
      <div
        onClick={onOutsideClick}
        className={`overlay ${showSNotes ? 'showSNotes' : ''}`}
      >
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
      </div>
    </StyledSNotes>
  );
};

export default SNotes;

const StyledSNotes = styled.div`
  .overlay {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.1);
    transition: background-color 0.8s ease;
    overflow-x: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 755px;
    height: 765px;
    background-color: rgba(0, 0, 0, 0.1);
    transition: background-color 0.8s ease;
    z-index: 200;
    background-color: rgba(0, 0, 0, 0);
    pointer-events: none;

    &.showSNotes {
      background-color: rgba(0, 0, 0, 0.1);
      pointer-events: auto;
    }
    @media all and (max-width: 420px) {
      top: 0;
      left: 0;
      transform: none;
      width: 100vw;
      height: 100vh; /* Fallback for browsers that do not support Custom Properties */
      height: calc(var(--vh, 1vh) * 100);
      font-size: 1.5rem;
    }
  }

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
    max-height: 560px;
    font-size: 1.5rem;
    @media all and (max-height: 720px) {
      height: 80vh; /* Fallback for browsers that do not support Custom Properties */
      height: calc(var(--vh, 1vh) * 80);
    }
    overflow-y: auto;
    font-family: 'Gaegu', cursive;
  }

  .notepad_sheet {
    background-color: #fff;
    width: 350px;
    height: 720px;
    transform: rotate(-3deg);
    position: absolute;
    right: -70px;
    top: 24px;
    @media all and (max-height: 720px) {
      height: 90vh; /* Fallback for browsers that do not support Custom Properties */
      height: calc(var(--vh, 1vh) * 90);
    }
  }

  .notepad_button {
    border: none;
    width: 50px;
    height: 50px;
    background-color: #fdb71a;
    border: 1px solid #30c3ee;
    position: relative;
    right: 50px;

    &:hover {
      cursor: pointer;
    }
  }

  .note {
    margin: 1rem 0;
  }
`;
