import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { getLastConversationIDFromLocalStorage } from '../lib/localStorage';

const StartDisplay = () => {
  const history = useHistory();

  function startNewGame() {
    history.push(`/testimony/729d0b36-6021-4843-8e09-da92c651022f`);
  }

  function loadFromLastSave() {
    const lastConversationID = getLastConversationIDFromLocalStorage();
    if (!lastConversationID) {
      toast('No save data available.');
    } else {
      if (lastConversationID === 'act-one' || 'act-three') {
        history.push(`/${lastConversationID}`);
      } else {
        history.push(`/testimony/${lastConversationID}`);
      }
    }
  }

  return (
    <StyledStartDisplay>
      <h1>Animal Crossing:</h1>
      <h2>New Murder!</h2>
      <section>
        <a href="/letter" className="start_page__button secondary">
          Read Ñen's Letter
        </a>
        <button onClick={startNewGame} className="start_page__button">
          New Game
        </button>
        <button onClick={loadFromLastSave} className="start_page__button">
          Load Game
        </button>
      </section>
    </StyledStartDisplay>
  );
};

export default StartDisplay;

const StyledStartDisplay = styled.div`
  color: green;
  width: 755px;
  height: 765px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;

  section {
    display: flex;
    flex-wrap: wrap;
  }

  .start_page__button {
    min-width: 300px;
    flex: 1;
    position: relative;
    text-decoration: none;
    border-radius: 15px;
    height: 60px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding: 2rem;
    font-weight: bold;
    font-size: 1.3em;
    margin-top: 2rem;
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: var(--cream);
    color: var(--brown-black);
    border: 1px solid var(--cream);
    transition: transform 0.2s ease;
    text-transform: uppercase;
  }

  .start_page__button.secondary {
    background-color: var(--brown-black);
    color: var(--cream);
  }

  .start_page__button:hover {
    color: #34b3a5;
    background-color: var(--cream);
    transform: translateY(-2px);
    cursor: pointer;
  }
`;
