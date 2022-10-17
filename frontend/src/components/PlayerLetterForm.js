import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { recordMessage } from '../lib/util';

const PlayerLetterForm = () => {
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    recordMessage(message);
    window.alert('message sent');
  };
  return (
    <StyledPlayerLetterForm>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">
          {' '}
          <h2 className="addtoinventory_title">Send your message!</h2>
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
          />
        </div>
        <input type="submit" value="Send" />
      </form>
    </StyledPlayerLetterForm>
  );
};

export default PlayerLetterForm;

const StyledPlayerLetterForm = styled.div`
  background-color: var(--cream);
  color: var(--brown-black);
  /* position: absolute; */
  width: 600px;
  height: 350px;
  /* top: 50%; */
  /* left: 50%; */
  /* transform: translate(-50%, -50%); */
  border-radius: 5px;
  z-index: 200;

  @media all and (max-width: 800px) {
    width: 90vw;
  }

  textarea {
    resize: none;
    height: 60%;
    width: 80%;
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
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 15px;
    padding: 0.5rem 1rem;
    border: none;
    color: var(--brown-black);
    /* line-height: 4rem; */
  }

  input[type='submit'] {
    display: inline;
    color: var(--cream);
    border: none;
    border-radius: 45px;
    font-size: 1rem;
    font-weight: 700;
    padding: 0.1rem 1rem;
    transform: translateY(0);
    transition: transform 0.2s ease;
    background-color: #34b3a5;
    margin: 0 0.5rem;
    &:hover {
      /* color: var(--brown-black); */
      cursor: pointer;
      transform: translateY(-2px);
    }
  }
`;
