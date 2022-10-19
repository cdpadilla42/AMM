import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import useForm from '../hooks/useForm';
import {
  addItemToLocalStorageInventory,
  saveFullInventoryToLocalSotrage,
} from '../lib/localStorage';
import { addToInventory, markUserHasFullInventory } from '../store/inventory';
import fullItemsList from '../lib/fullItemsList';
import PlayerLetterForm from './PlayerLetterForm';

const PlayerLetterFormController = () => {
  const containerRef = useRef(null);
  const { isLetterFormOpen } = useSelector((state) => state.app);

  // useEffect(() => {
  //   if (isOpen) {
  //     // focus on input el.
  //     inputRef.current.focus();
  //   }
  // }, [isOpen]);

  return (
    <StyledPlayerLetterFormController ref={containerRef}>
      {isLetterFormOpen && <PlayerLetterForm />}
    </StyledPlayerLetterFormController>
  );
};

export default PlayerLetterFormController;

const StyledPlayerLetterFormController = styled.div`
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

  @media all and (max-width: 420px) {
    top: 0;
    left: 0;
    right: 0;
    transform: none;
    width: 100vw;
    height: 100vh; /* Fallback for browsers that do not support Custom Properties */
    height: calc(var(--vh, 1vh) * 100);
    font-size: 1.5rem;
  }
`;
