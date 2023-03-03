import React, { useEffect } from 'react';
import AnchorLink from '../components/Link';
import styled from 'styled-components';

const Letter = () => {
  useEffect(() => {
    document.body.style = 'background: #f5f4d7;';
    return () => (document.body.style = '');
  }, []);
  return (
    <StyledLetter>
      <section className="letter_container">
        <h1>Support</h1>
        <h2>Hire Us!</h2>
        <p>
          <AnchorLink href="https://www.jennpadilla.games" newWindow>
            jennpadilla.games
          </AnchorLink>{' '}
          for storyboarding, character design, and game design.
        </p>

        <p>
          <AnchorLink href="https://www.chrisdpadilla.com/" newWindow>
            chrisdpadilla.com
          </AnchorLink>{' '}
          for… well, Chris isn’t looking for work right now. Thanks for asking,
          though!
        </p>
        <h2>Support Us!</h2>
        <p>
          Support our art, music, and code through{' '}
          <AnchorLink href="https://ko-fi.com/chrisjenn" newWindow>
            Ko-Fi
          </AnchorLink>
          .
        </p>

        <p>
          Buy AC:NM’s Soundtrack on{' '}
          <AnchorLink
            href="https://letsgochris.bandcamp.com/album/ac-new-murder-soundtrack"
            newWindow
          >
            Bandcamp
          </AnchorLink>
          .
        </p>
        <h2>Keep In Touch!</h2>

        <p>Subscribe to AC:NM’s newsletter to hear about future projects!</p>
        <p>
          Follow{' '}
          <AnchorLink href="https://twitter.com/acnewmurder" newWindow>
            @acnewmurder
          </AnchorLink>{' '}
          ,{' '}
          <AnchorLink href="https://twitter.com/jennpadillart" newWindow>
            @jennpadillart
          </AnchorLink>{' '}
          , and{' '}
          <AnchorLink href="https://twitter.com/letsgokris" newWindow>
            @letsgokris
          </AnchorLink>
          .
        </p>

        <h2>Spread the Word!</h2>

        <p>Tweet / share the game! It helps us A LOT!</p>
      </section>
    </StyledLetter>
  );
};

export default Letter;

const StyledLetter = styled.div`
  background-color: #f5f4d7;
  color: #231e1e;
  height: 100%;

  .letter_container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 3rem;
    padding-bottom: 3rem;
    max-width: 960px;
    font-style: italic;
    font-weight: 700;
    font-family: 'Averia Libre', sans-serif;
    font-size: 1.8rem;
    text-align: left;
  }
`;
