import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import LandingHeroBG from '../imgs/patternedbgs/aabg1.jpg';

const LandingPage = () => {
  const history = useHistory();
  const goToCredits = (e) => {
    e.preventDefault();
    history.push('/credits');
  };

  return (
    <StyledLanding>
      <header className="hero">
        <div className="container">
          <div className="animation_prompt" aria-hidden="true"></div>
          <div className="hero__text_greeting">
            <h1>
              Animal Crossing:
              <br />
              NEW MURDER
            </h1>
            <h2>A Murder Mystery Who-Dun-It inspired by Animal Crossing</h2>
            <div className="hero__cta_container">
              <Link to="/letter" className="hero__cta_button secondary">
                Read Ñenn's Letter
              </Link>
              <Link to="/play" className="hero__cta_button">
                Play
              </Link>
            </div>
          </div>
        </div>
      </header>
      <section className="about">
        <div className="about__description">
          <h2 className="section_heading">About</h2>
          <hr />
          <p className="italics">
            Animal Crossing: New Murder is an Ace-Attorney-like murder mystery
            game that pairs with Animal Crossing: New Horizons (ACNH) for
            exploration and storytelling.
          </p>
          <p>
            Animal Crossing: New Murder is a game that’s all about finding
            evidence, talking to fun characters, and solving an (attempted)
            murder mystery! The game is split into two different playstyles that
            feed into each other. On one side is a dream island within the
            Switch game, ACNH. You, as the player, open up ACNH and come to the
            dream island to search for evidence and clues. The other side is a
            visual-novel web browser game. Through the website, you talk to the
            villagers and try to get to the bottom of this mystery. Enter the
            items you find in ACNH to present to characters and in court. But
            some items you can only find with help from the villagers on the web
            game. After gathering enough evidence, you’ll put your knowledge to
            the test in the courtroom to nail the culprit!
          </p>
          <p>
            To play this game you need a{' '}
            <a
              href="https://www.nintendo.com/switch/"
              rel="noopener"
              target="_blank"
            >
              Nintendo Switch
            </a>
            , a{' '}
            <a
              href="https://www.nintendo.com/switch/online-service/"
              rel="noopener"
              target="_blank"
            >
              Nintendo Online Membership
            </a>
            , and a copy of{' '}
            <a
              href="https://www.nintendo.com/store/products/animal-crossing-new-horizons-switch/"
              rel="noopener"
              target="_blank"
            >
              Animal Crossing: New Horizons
            </a>
            . You cannot progress in the web game without the ACNH counterpart.
          </p>
          <p>
            For the web browser game, you need an internet connection and a web
            browser. You can use anything, from desktop to mobile. For best
            results, we recommend Google Chrome or Firefox.
          </p>
          <h2 className="section_heading" rel="noopener" target="_blank">
            How to Start
          </h2>
          <p>
            To get to the dream island in ACNH, you have to lie in a bed inside
            your house. Go to “sleep” and you will see Luna. Tell her you would
            like to dream and give her the dream address code. Shortly after you
            will wake up on the dream island tied to this game, “New Leaf.” You
            have to upgrade your tent to a house to unlock Luna. If you would
            like to learn more about how dreams work in ACNH, you can read the
            Nookipedia page{' '}
            <a
              href="https://nookipedia.com/wiki/Dream"
              rel="noopener"
              target="_blank"
            >
              here
            </a>
            .
          </p>
          <p style={{ 'font-style': 'normal', 'text-align': 'center' }}>
            <strong>Dream Address: DA-5197-5510-7359</strong>
          </p>
          <p>
            Trigger warning for discussions of blood, violence, and self-harm
            and depictions of cartoon blood.
          </p>
        </div>
        <aside className="about__credits">
          <h2 className="section_heading">Credits</h2>
          <hr />
          <ul className="credits__list">
            <li>
              <h4>Art/Story</h4>
              <span>Jenn Padilla</span>
              <br />
              <a
                href="https://twitter.com/jennpadillart"
                rel="noopener"
                target="_blank"
              >
                @jennpadillart
              </a>
              <br />
              <a
                href="https://www.jennpadilla.com/"
                rel="noopener"
                target="_blank"
              >
                jennpadilla.com
              </a>
              <br />
            </li>
            <li>
              <h4>Software/Development</h4>
              <span>Chris Padilla</span>
              <br />
              <a
                href="https://twitter.com/letsgokris"
                rel="noopener"
                target="_blank"
              >
                @letsgokris
              </a>
              <br />
              <a
                href="https://chrisdpadilla.com"
                rel="noopener"
                target="_blank"
              >
                chrisdpadilla.com
              </a>
              <br />
            </li>
            <li>
              <a onClick={goToCredits} href="">
                Full Credits
              </a>
            </li>
          </ul>
          <h2 className="section_heading">Soundtrack</h2>
          <a
            href="https://letsgochris.bandcamp.com/album/ac-new-murder-soundtrack"
            rel="noopener"
            target="_blank"
          >
            <img
              className="ost_cover"
              src="https://padilla-media.s3.amazonaws.com/blog/acnm/acnmcover.jpg"
              alt="AC: New Murder OST Cover Art"
            />
          </a>
        </aside>
      </section>
      <footer>
        <p>Made with ❤️ by Jenn & Chris Padilla</p>
        <p>
          Animal Crossing: New Horizons is published by Nintendo® All characters
          and rights belong to them.
        </p>
      </footer>
    </StyledLanding>
  );
};

export default LandingPage;

const StyledLanding = styled.main`
  background-color: var(--cream);
  body,
  ul,
  li,
  h1,
  h4 {
    margin: 0;
    padding: 0;
  }

  h4 {
    margin: 0.5rem 0;
  }

  button {
    border: none;
    background-color: rgba(0, 0, 0, 0);
  }

  ul {
    list-style: none;
  }

  * {
    box-sizing: border-box;
  }

  .hero {
    width: 100vw;
    height: auto;
  }

  @media all and (max-width: 960px) {
    .hero {
      height: 90vh;
    }
  }

  .hero {
    background-color: #123a15;
    background-image: url(${LandingHeroBG});
    background-attachment: fixed;
    background-size: repeat;
  }

  .hero .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .hero__text_greeting {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* background-color: #4d4762; */
    text-align: center;
    width: 80vw;
    height: 60vh;
    padding: 0 1rem;
    transform: translateY(0);
    opacity: 1;
    transition: opacity 1.6s ease, transform 1.6s ease;
  }
  .hero__text_greeting.pre-animation {
    opacity: 0;
    transform: translateY(3rem);
  }

  /* .about h2, */
  .work h2,
  .uses h2,
  .contact h2,
  .firebase_icon,
  .icons__icon,
  .social_icons,
  .hero h1 {
    color: #fcf6f3;
    /* text-shadow: 2px 1px 0 #fcf6f3, 4px 3px 0 #ff8f7c; */
    text-shadow: 2px 1px 0 #75ddc6;
  }

  .hero h1 {
    font-size: 4rem;
    font-style: italic;
    font-weight: 700;
    text-shadow: 2px 1px 0 #ff8f7c;
  }

  .hero h2 {
    margin: 0;
    margin-top: 0.5rem;
    color: #fcf6f3;
    font-weight: 700;
  }

  .hero__cta_container {
    margin: 1rem 0;
    display: flex;
    width: 80%;
  }

  @media all and (max-width: 960px) {
    .hero__cta_container {
      flex-direction: column-reverse;
    }
  }

  .hero__cta_button {
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

  .hero__cta_button.secondary {
    background-color: var(--brown-black);
    color: var(--cream);
  }

  .hero__cta_button:hover {
    color: #34b3a5;
    background-color: var(--cream);
    transform: translateY(-2px);
    cursor: pointer;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #fcf6f3;
  }

  hr {
    border: none;
    border-top: 5px dashed rgba(79, 201, 204, 0.6);
  }

  ::selection {
    background: rgba(79, 201, 204, 0.6);
  }

  ::-moz-selection {
    background: rgba(79, 201, 204, 0.6);
  }

  nav {
    border-bottom: 1px solid #c9c9c9;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    width: 100vw;
    background-color: #fff;
    /* Temp hide for working with Hero */
    display: none;
  }

  nav .container {
    display: flex;
    flex-basis: 1100px;
    max-width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  p {
    text-indent: 2rem;
  }

  p.italics {
    font-style: italic;
  }

  @media all and (min-width: 992px) {
    nav .container {
      max-width: 962px;
    }
  }
  @media all and (min-width: 1200px) {
    nav .container {
      max-width: 1140px;
    }
  }
  .logo {
    width: 50px;
    margin: 0 1rem;
  }

  .nav__menu_items {
    display: flex;
  }

  .nav__menu_items {
    display: none;
  }

  button.hamburger {
    /* font-size: 1.8rem; */
    padding: 1.7rem;
    cursor: pointer;
    color: slategray;
  }

  @media all and (min-width: 992px) {
    .nav__menu_items {
      display: flex;
    }

    .container .hamburger {
      display: none;
    }
  }
  .nav__menu_items a {
    display: block;
    text-decoration: none;
    text-transform: uppercase;
    color: slategray;
    padding: 1.4rem;
  }

  .nav__menu_items a.active {
    border-bottom: 4px solid salmon;
    color: salmon;
  }

  /* Hero */
  /* About */
  .about {
    text-align: center;
    display: flex;
    justify-content: center;
    width: auto;
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 3rem;
    background-color: var(--cream);
  }

  .about__description {
  }

  .about__credits {
    padding: 3rem 0;
    padding-right: 3rem;
    max-width: 500px;
    color: #4d4762;
  }
  .about__credits img {
    max-width: 300px;
    width: 100%;
    /* border-radius: 50%; */
  }

  .about h2,
  .work h2 {
    color: var(--brown-black);
  }

  .contact h2,
  .uses h2 {
    color: #fcf6f3;
  }

  .about a {
    color: #ff8f7c;
  }

  .about__description {
    padding: 3rem 0;
    padding-right: 3rem;
    flex-basis: 500px;
    text-align: start;
    color: #4d4762;
  }

  @media all and (max-width: 960px) {
    .about {
      flex-direction: column;
      font-size: 1.3rem;
      line-height: 2.5rem;
    }

    .about__credits {
      padding: 0 3rem;
    }

    .about__description {
      margin: 0 auto;
      padding: 0;
      max-width: 500px;
      flex-basis: 0;
    }
  }
  @media all and (max-width: 768px) {
    .about__description {
      max-width: 100%;
      padding: 0 3rem;
    }
  }
  .section_heading {
    font-size: 3rem;
    text-align: center;
  }

  .credits__list li {
    margin-bottom: 1rem;
  }

  .uses {
    background-color: #4d4762;
    padding-top: 2rem;
    padding-bottom: 5rem;
    color: #fcf6f3;
  }

  .uses hr {
    width: 100%;
  }

  .contact .container,
  .work .container,
  .uses .container {
    max-width: 1280px;
    width: 85%;
    margin: 0 auto;
    text-align: center;
  }

  .firebase_icon {
    height: 5.1875rem;
    filter: drop-shadow(2px 1px 0 #fcf6f3);
  }

  .uses__icons {
    display: grid;
    width: 100%;
    margin-top: 3rem;
    padding: 0 10rem;
    grid-template-columns: repeat(4, minmax(125px, 1fr));
    gap: 1rem;
    opacity: 1;
    transform: translateY(0);
    transition: opacity 1.6s ease, transform 1.6s ease;
  }
  .uses__icons.pre-animation {
    opacity: 0;
    transform: translateY(4rem);
  }

  @media all and (max-width: 1045px) {
    .uses__icons {
      grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
    }
  }
  @media all and (max-width: 1040px) {
    .uses__icons {
      padding: 0 5rem;
    }
  }
  @media all and (max-width: 960px) {
    .uses__icons {
      padding: 0 2rem;
    }
  }
  .icons__icon {
    text-shadow: 2px 1px 0 #fcf6f3;
    font-size: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .icon__title {
    font-size: 1rem;
    margin-top: 1rem;
    text-shadow: none;
  }

  .work {
    padding: 2rem 0;
  }

  .work__preview img {
    width: 100%;
  }

  .work h4 {
    color: #4d4762;
  }

  .contact {
    background-color: #4d4762;
    color: #fcf6f3;
    padding: 2rem 0;
  }

  .connect__flex_wrap {
    display: flex;
  }

  .connect_flex__text_prompt {
    flex: 1;
    width: 60%;
    text-align: left;
  }

  @media all and (min-width: 1050px) {
    .connect_flex__text_prompt {
      width: 40%;
    }
  }
  @media all and (max-width: 565px) {
    .connect_flex__text_prompt {
      width: 100%;
    }
  }
  .connect__flex_wrap > *:last-child {
    flex: 2;
  }

  @media all and (max-width: 996px) {
    .connect__flex_wrap {
      flex-direction: column;
      align-items: center;
    }

    .connect_flex__text_prompt {
      text-align: center;
    }
  }
  .contact h6 {
    font-size: 1rem;
  }

  .social_icons {
    text-shadow: 2px 1px 0 #fcf6f3;
    display: flex;
    width: 200px;
    justify-content: center;
    margin: 0 auto;
    font-size: 2rem;
  }

  .social_icons > * {
    flex: 1;
  }

  .social_icons a {
    color: #75ddc6;
    transition: color 0.4s ease;
  }

  .social_icons a:hover {
    color: #ffcb75;
  }

  .contact_form {
    padding: 0 2rem;
    padding-bottom: 2rem;
  }
  .contact_form input,
  .contact_form textarea {
    width: 100%;
    padding: 0.8rem;
    margin: 0.5rem 0;
    border: 1px solid #bbbbbb;
    border-radius: 3px;
  }
  .contact_form .flex-wrap {
    display: flex;
    flex-direction: column;
  }
  @media all and (min-width: 996px) {
    .contact_form .flex-wrap {
      flex-direction: row;
    }
    .contact_form .flex-wrap > input:first-child {
      margin-right: 0.5rem;
    }
    .contact_form .flex-wrap > input:last-child {
      margin-left: 0.5rem;
    }
  }
  .contact_form textarea {
    resize: none;
  }
  .contact_form textarea:focus,
  .contact_form input:focus {
    outline: none;
    box-shadow: 0px 0px 5px lightblue;
  }
  .contact_form textarea {
    font-family: 'Poppins', sans-serif;
  }
  .contact_form button {
    margin-top: 1rem;
    color: white;
    font-size: 1rem;
    text-transform: uppercase;
    padding: 0.8rem 3rem;
    background-color: #75ddc6;
    border: 5px solid white;
    outline: 3px solid #75ddc6;
    transition: background-color 0.4s ease, outline 0.4s ease;
  }
  .contact_form button:hover {
    background-color: #ffcb75;
    outline: 3px solid #ffcb75;
  }

  @media all and (max-width: 996px) {
    .connect_flex__form_section {
      padding: 0;
      width: 100%;
    }
  }
  footer {
    padding: 1rem 0;
    text-align: center;
    background-color: var(--brown-black);
    color: var(--cream);
  }

  @media all and (max-width: 996px) {
    footer {
      font-size: 1.2rem;
    }
  }

  .ost_cover {
    width: 100%;
  }
`;
