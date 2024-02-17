import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { dialogueIDConstants } from '../lib/constants';
import { recordMessage } from '../lib/util';
import { setLetterFormOpen } from '../store/app';
import { switchConversation } from '../store/dialogue';

const PlayerLetterForm = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setMessage(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim().length === 0) {
      window.alert("You haven't written anything!");
      return;
    }
    recordMessage(message);
    dispatch(setLetterFormOpen(false));
    dispatch(switchConversation(dialogueIDConstants.EPILOGUE_LETTER_SENT));
  };

  const handleNevermind = () => {
    dispatch(setLetterFormOpen(false));
  };

  return (
    <StyledPlayerLetterForm>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">
          {' '}
          <h2 className="addtoinventory_title">Send your message!</h2>
          <p>
            You&#39;re letter will be sent directly to the developers. It will
            be sent anonymously and no personal information is stored.{' '}
          </p>
        </label>
        <br />
        <div className="input_wrapper">
          <textarea
            name="message"
            type="text"
            value={message}
            onChange={handleChange}
            className="addtoinventory_input"
            rows="5"
            placeholder="Dear Ñenn ...   Sincerely, Detective"
          />
        </div>
        <div className="buttons">
          <button
            type="button"
            className="nevermind-button"
            onClick={handleNevermind}
          >
            Nevermind!
          </button>
          <input type="submit" value="Send" />
        </div>
        <div className="gap"></div>
      </form>
    </StyledPlayerLetterForm>
  );
};

export default PlayerLetterForm;

const StyledPlayerLetterForm = styled.div`
  background-color: var(--cream);
  color: var(--brown-black);
  /* position: absolute; */
  /* width: 600px; */
  /* height: 350px; */
  width: 100%;
  height: 100%;
  /* top: 50%; */
  /* left: 50%; */
  /* transform: translate(-50%, -50%); */
  border-radius: 5px;
  z-index: 200;
  box-shadow: 0 0.2rem 1.2rem rgba(0, 0, 0, 0.2);
  pointer-events: auto;

  @media all and (max-width: 800px) {
    width: 100vw;
  }

  form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  p {
    margin: 1rem;
    /* padding-left: 1rem; */
    /* text-align: left; */
    /* text-indent: 1rem; */
  }

  textarea {
    resize: none;
    height: 100%;
    width: 80%;
    @media all and (max-width: 800px) {
      font-size: 2rem;
    }
  }

  text-align: center;

  .addtoinventory_close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }

  .addtoinventory_title {
    margin: 0;
  }

  .addtoinventory_message_display {
    min-height: 25px;
  }

  .addtoinventory_message_display.success {
    color: green;
  }

  .addtoinventory_message_display.input-error {
    color: red;
  }

  .input_wrapper {
    position: relative;
    flex: 1;
    width: 100%;
    &:after {
      border-bottom: 4px dotted var(--brown-black);
      display: block;
      content: '';
      width: 300px;
      height: 4px;
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      bottom: 10px;
    }
  }

  .addtoinventory_input {
    position: relative;
    /* width: 200px; */
    font-size: 1rem;
    font-weight: bold;
    border-radius: 15px;
    padding: 0.5rem 1rem;
    padding-bottom: 1rem;
    border: none;
    color: var(--brown-black);
    /* line-height: 4rem; */
    @media all and (max-width: 800px) {
      font-size: 1.5rem;
    }

    &input::placeholder {
      color: #ddd;
      opacity: 0.8;
    }
  }

  .buttons {
    display: flex;
    align-items: center;
  }

  input[type='submit'],
  .nevermind-button {
    display: inline;
    color: var(--cream);
    border: none;
    border-radius: 45px;
    font-size: 1rem;
    font-weight: 700;
    transform: translateY(0);
    transition: transform 0.2s ease;
    background-color: #34b3a5;
    font-size: 1.5rem;
    font-weight: 700;
    padding: 0.5rem 2rem;
    margin: 1rem;
    @media all and (max-width: 800px) {
      font-size: 2rem;
      padding: 1rem 1rem;
      margin: 1rem 0.5rem;
      width: 80vw;
    }
    &:hover {
      /* color: var(--brown-black); */
      cursor: pointer;
      transform: translateY(-2px);
    }
  }

  .nevermind-button {
    background-color: #ddd;
    color: #555;
  }

  .gap {
    @media all and (max-width: 800px) {
      height: 100px;
    }
  }
`;
