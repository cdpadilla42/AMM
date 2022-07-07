import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const creditsData = [
  <ul class="credits__list">
    <li>
      <h2>Art/Story</h2>
      <h3>Jenn Padilla</h3>
      <a href="https://twitter.com/jennpadillart">@jennpadillart</a>
      <br />
      <a href="https://www.jennpadilla.com/">jennpadilla.com</a>
      <br />
    </li>
    <li>
      <h2>Software/Development</h2>
      <h3>Chris Padilla</h3>
      <a href="https://twitter.com/letsgokris">@letsgokris</a>
      <br />
      <a href="https://chrisdpadilla.com">chrisdpadilla.com</a>
      <br />
    </li>
  </ul>,
  <ul class="credits__list">
    <li>
      <h2>Agent S's Art</h2>
      <h3>Kelly McCraw</h3>
      <br />
      <a href="https://twitter.com/mccraw_kelly">@mccraw_kelly</a>
      <br />
    </li>
    <li>
      <h2>Beta Testers</h2>
      <h3>Lorenzo Estrada</h3>
      <br />
      <h3>Kelly McCraw</h3>
      <br />
    </li>
  </ul>,
];

const Credits = () => {
  const history = useHistory();
  const [slideIndex, setSlideIndex] = useState(0);

  // link to the epilogue
  // id: 56cc2315-f580-4116-bf9d-be350ea15e10
  const handleClick = () => {
    history.push('/testimony/56cc2315-f580-4116-bf9d-be350ea15e10');
  };

  const finalSlide = (
    <>
      <p>Thank you so much fora to playing my game!</p>
      <br />
      <button onClick={handleClick}>Epilogue</button>
    </>
  );

  const onFinalSlide = !(slideIndex < creditsData.length);

  const nextSlide = (e) => {
    if (e.currentTarget !== e.target) {
      console.log('ok');
      return;
    }
    if (onFinalSlide) return;
    setSlideIndex(slideIndex + 1);
  };

  const currentSlide =
    slideIndex < creditsData.length ? creditsData[slideIndex] : finalSlide;

  return (
    <StyledCredits onClick={nextSlide}>
      {creditsData}
      {finalSlide}
    </StyledCredits>
  );
};

export default Credits;

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
`;
