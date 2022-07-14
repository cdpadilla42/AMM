import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { getLastConversationIDFromLocalStorage } from '../lib/localStorage';
import AnimalCarousel from './AnimalCarousel';

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
    <>
      <StyledStartDisplay>
        <header>
          <h1>Animal Crossing:</h1>
          <h2>New Murder!</h2>
        </header>
        <section>
          <button onClick={startNewGame} className="start_page__button">
            New Game
          </button>
          <button onClick={loadFromLastSave} className="start_page__button">
            Load Game
          </button>
          <a href="/letter" className="start_page__button secondary">
            Read Ñen's Letter
          </a>
        </section>
        <div className="animal_carousel">
          <AnimalCarousel />
        </div>
      </StyledStartDisplay>
    </>
  );
};

export default StartDisplay;

const StyledStartDisplay = styled.div`
  color: white;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 755px;
  height: 765px;
  /* position: relative; */

  * {
    padding: 2rem;
    text-align: center;
  }
  @media all and (max-width: 600px) {
    width: 100vw;
    height: 100vh; /* Fallback for browsers that do not support Custom Properties */
    height: calc(var(--vh, 1vh) * 100);
  }

  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    z-index: 100;
    align-self: end;
  }

  .start_page__button {
    min-width: 300px;
    /* flex: 1; */
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
    margin-top: 0rem;
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: var(--cream);
    color: var(--brown-black);
    border: 1px solid var(--cream);
    transition: transform 0.2s ease;
    text-transform: uppercase;
  }

  @media all and (max-width: 600px) {
    .start_page__button {
      height: 40px;
    }
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

  .animal_carousel {
    position: absolute;
  }

  @media all and (min-width: 600px) {
    .animal_carousel .game_container__animal_image.single {
      top: inherit;
    }
  }

  .animal_transition_left-exit-active.game_container__animal_image.single,
  .animal_transition_right-exit-active.game_container__animal_image.single {
    transition: transform 0.6s ease;
    left: 50%;
    transform: translateX(200%);
  }

  .animal_transition_left-enter.game_container__animal_image.single.left_facing,
  .animal_transition_right-enter.game_container__animal_image.single.left_facing {
    transition: transform 0.6s ease;
    left: 50%;
    transform: translateX(-200%) rotateY(180deg);
  }
`;
