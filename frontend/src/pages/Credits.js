import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { isGameCompleteLocalStorage } from '../lib/localStorage';

const creditsData = [
  <ul class="credits__list">
    <li>
      <h2>Art / Story / Game Design</h2>
      <h3>Jenn Padilla</h3>
      <a
        href="https://twitter.com/jennpadillart"
        rel="noopener"
        target="_blank"
      >
        @jennpadillart
      </a>
      <br />
      <a href="https://www.jennpadilla.com/" rel="noopener" target="_blank">
        jennpadilla.com
      </a>
      <br />
    </li>
    <li>
      <h2>Composer / Game & UI Developer</h2>
      <h3>Chris Padilla</h3>
      <a href="https://twitter.com/letsgokris" rel="noopener" target="_blank">
        @letsgokris
      </a>
      <br />
      <a href="https://chrisdpadilla.com" rel="noopener" target="_blank">
        chrisdpadilla.com
      </a>
      <br />
    </li>
  </ul>,
  <ul class="credits__list">
    <li>
      <h2>Agent S's Art</h2>
      <h3>Kelly McCraw</h3>
      <a href="https://twitter.com/mccraw_kelly" rel="noopener" target="_blank">
        @mccraw_kelly
      </a>
    </li>
    <li>
      <h2>Beta Testers</h2>
      <h3>Lorenzo Estrada</h3>
      <a
        href="https://twitter.com/Lozoescartoons"
        rel="noopener"
        target="_blank"
      >
        @Lozoescartoons
      </a>
    </li>
    <li>
      <h3>Kelly McCraw</h3>
      <a href="https://twitter.com/mccraw_kelly" rel="noopener" target="_blank">
        @mccraw_kelly
      </a>
    </li>
  </ul>,
  <ul class="credits__list">
    <li>
      <h2>Beta Testers cont.</h2>
      <h3>Kelsey Heater</h3>
      <a
        href="https://twitter.com/shutupsprinkles"
        rel="noopener"
        target="_blank"
      >
        @shutupsprinkles
      </a>
      <br />
      <a
        href="https://www.twitch.tv/shutupsprinkles"
        rel="noopener"
        target="_blank"
      >
        Stream on Twitch
      </a>
    </li>
    <li>
      <h3>Rez Fox</h3>
      <a href="https://twitter.com/Rez_Fox_Live" rel="noopener" target="_blank">
        @Rez_Fox_Live
      </a>
      <br />
      <a href="https://www.twitch.tv/rez_fox" rel="noopener" target="_blank">
        Stream on Twitch
      </a>
    </li>
    <li>
      <h3>taelico</h3>
      <a href="https://twitter.com/taelico_" rel="noopener" target="_blank">
        @taelico_
      </a>
      <br />
      <a href="https://www.twitch.tv/taelico" rel="noopener" target="_blank">
        Stream on Twitch
      </a>
    </li>
    <li>
      <h3>Tay</h3>
      <a href="https://twitter.com/taysamey" rel="noopener" target="_blank">
        @taysamey
      </a>
      <br />
      <a href="https://www.twitch.tv/taysamey" rel="noopener" target="_blank">
        Stream on Twitch
      </a>
    </li>
    <li>
      <h3>lavender</h3>
      <a
        href="https://twitter.com/honeydewbread "
        rel="noopener"
        target="_blank"
      >
        @honeydewbread
      </a>
      <br />
      <a
        href="https://www.twitch.tv/honeydewbread "
        rel="noopener"
        target="_blank"
      >
        Stream on Twitch
      </a>
    </li>
    <li>
      <h3>Lindy</h3>
      <a href="https://twitter.com/gremlindy " rel="noopener" target="_blank">
        @gremlindy
      </a>
      <br />
      <a href="https://www.twitch.tv/gremlindy " rel="noopener" target="_blank">
        Stream on Twitch
      </a>
    </li>
    <li>
      <h3>savingmiller</h3>
      <a
        href="https://twitter.com/savingmiller "
        rel="noopener"
        target="_blank"
      >
        @savingmiller
      </a>
      <br />
      <a
        href="https://www.twitch.tv/savingmiller "
        rel="noopener"
        target="_blank"
      >
        Stream on Twitch
      </a>
    </li>
  </ul>,
  <ul class="credits__list">
    <li>
      <h2>Beta Testers cont.</h2>
      <h3>Neen</h3>
      <a href="https://twitter.com/neengamer" rel="noopener" target="_blank">
        @neengamer
      </a>
    </li>
    <li>
      <h3>Sean</h3>
      <a href="https://twitter.com/SFinerFACE" rel="noopener" target="_blank">
        @SFinerFACE
      </a>
    </li>
    <li>
      <h3>Charlotte Lily v</h3>
      <a
        href="https://twitter.com/charlottelilyv"
        rel="noopener"
        target="_blank"
      >
        @charlottelilyv
      </a>
    </li>
    <li>
      <h3>David Brink</h3>
      <a
        href="https://twitter.com/MyHandsAreBlank"
        rel="noopener"
        target="_blank"
      >
        @MyHandsAreBlank
      </a>
    </li>
    <li>
      <h3>Dani</h3>
      <a href="https://twitter.com/mystic_arium" rel="noopener" target="_blank">
        @mystic_arium
      </a>
    </li>
    <li>
      <h3>Omri A. Stier</h3>
      <a href="https://twitter.com/Oasis_Mii" rel="noopener" target="_blank">
        @Oasis_Mii
      </a>
    </li>
  </ul>,
  <ul>
    <li>
      <h2>Patterns</h2>
      <a href="https://neroh.uk/" rel="noopener" target="_blank">
        Matt Macpherson
      </a>
      <br />
      <a
        href="https://www.etsy.com/shop/mochicreative?ref=simple-shop-header-name&listing_id=853068410"
        rel="noopener"
        target="_blank"
      >
        Aliyah (mochicreative)
      </a>
      <br />
      Nintendo
      <br />
    </li>
    <li>
      <h2>Animal Crossing</h2>
      Animal Crossing: New Horizons is published by Nintendo®
      <br />
      All characters and rights belong to them.
    </li>
  </ul>,
];

const Credits = ({ gameComplete }) => {
  const history = useHistory();
  const [slideIndex, setSlideIndex] = useState(0);

  // link to the epilogue
  // id: 56cc2315-f580-4116-bf9d-be350ea15e10
  const handleClick = () => {
    history.push('/testimony/56cc2315-f580-4116-bf9d-be350ea15e10');
  };
  const handleHomeClick = () => {
    history.push('/landing');
  };

  const finalSlide = (
    <>
      {gameComplete || isGameCompleteLocalStorage() ? (
        <>
          <img
            src="https://cdn.sanity.io/images/qvonp967/production/77a09537bcf41d912e1db3ddc0d8f033436b0f2e-1245x720.png"
            alt="Thank you postcard!"
          />
          <h2>Congratulations!!!</h2>
          <br />
          <button onClick={handleClick}>Epilogue</button>
        </>
      ) : (
        <button onClick={handleHomeClick}>Back to home page!</button>
      )}
    </>
  );

  const onFinalSlide = !(slideIndex < creditsData.length);

  const nextSlide = (e) => {
    if (e.target.tagName === 'A') {
      return;
    }
    if (onFinalSlide) return;
    setSlideIndex(slideIndex + 1);
  };

  const currentSlide =
    slideIndex < creditsData.length ? creditsData[slideIndex] : finalSlide;

  return (
    <StyledCredits onClick={nextSlide}>
      {currentSlide}{' '}
      {!onFinalSlide && (
        <div className="next_arrow" onClick={nextSlide}>
          <FontAwesomeIcon icon={faCaretDown} color="#ffb500" size="2x" />
        </div>
      )}
    </StyledCredits>
  );
};

const mapStateToProps = (state) => ({
  gameComplete: state.inventory.gameComplete,
});

export default connect(mapStateToProps)(Credits);

const StyledCredits = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: var(--cream);
  color: var(--green);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  ul,
  li,
  h1,
  h2,
  h3,
  h4 {
    margin: 0;
    padding: 0;
  }

  h1 {
    font-size: 3rem;
    margin-top: 0;
  }

  h2 {
    margin: 2rem 0 0.5rem 0;
    text-decoration: underline;
  }

  h3 {
    margin-top: 1rem;
  }

  p {
    font-size: 1rem;
  }

  ul {
    list-style: none;
  }

  a {
    color: var(--blue);
  }

  button {
    width: calc(100% - 2rem);
    max-width: 200px;
    font-weight: 600;
    border-radius: 15px;
    padding: 1rem;
    background-color: var(--blue);
    border: 4px solid #0b72a2;
    color: var(--cream);
    &:hover {
      border: 4px solid #17b5ff;
    }
    font-size: 1.5rem;
  }

  .next_arrow {
    box-sizing: border-box;
    left: calc(50% - 25px);
    animation: bounce 0.6s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    padding: 0 1rem;
    &:hover {
      cursor: pointer;
    }
  }

  img {
    max-width: 80%;
    box-shadow: 0 0.2rem 1.2rem rgba(0, 0, 0, 0.2);
    transform: rotate(-3deg);
  }
`;
