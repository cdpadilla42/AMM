import React from 'react';
import styled from 'styled-components';

const LandingPage = () => {
  return (
    <StyledLanding>
      <header class="hero">
        <div class="container">
          <div class="animation_prompt" aria-hidden="true"></div>
          <div class="hero__text_greeting">
            <h1>Time for a NEW MURDER!!!</h1>
            <h2>An Animal Crossing Murder Mystery Fan Game</h2>
            <div className="hero__cta_container">
              <a href="/letter" className="hero__cta_button secondary">
                Read Ñen's Letter
              </a>
              <a href="/play" className="hero__cta_button">
                Play
              </a>
            </div>
          </div>
        </div>
      </header>
      <section class="about">
        <div class="about__description">
          <h2 class="section_heading">About</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            minus sint consectetur! Rem, soluta delectus suscipit architecto
            esse iusto in deleniti impedit repudiandae ab, dolor maxime minima,
            dolorum tempora ducimus.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam
            fugit atque consectetur sint incidunt corporis officia sunt dolore!
            Provident corrupti incidunt atque. In rerum aperiam provident
            laudantium beatae fugit! Doloremque.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum ullam
            fuga quod sit est, aperiam voluptatum iste quas earum dolorem!
            Consectetur error mollitia quidem rerum deleniti dolor amet optio
            et.
          </p>
          <p></p>
        </div>
        <aside class="about__credits">
          <h2 class="section_heading">Credits</h2>
          <hr />
          <ul class="credits__list">
            <li>
              <h4>Art/Story</h4>
              <span>Jenn Padilla</span>
              <br />
              <a href="https://twitter.com/jennpadillart">@jennpadillart</a>
              <br />
              <a href="https://www.jennpadilla.com/">jennpadilla.com</a>
              <br />
            </li>
            <li>
              <h4>Software/Development</h4>
              <span>Chris Padilla</span>
              <br />
              <a href="https://twitter.com/letsgokris">@letsgokris</a>
              <br />
              <a href="https://chrisdpadilla.com">chrisdpadilla.com</a>
              <br />
            </li>
            <li>
              <h4>Agent S's Art</h4>
              <span>Kelly McCraw</span>
              <br />
              <a href="https://twitter.com/mccraw_kelly">@mccraw_kelly</a>
              <br />
            </li>
            <li>
              <h4>Beta Testers</h4>
              <span>Lorenzo Estrada</span>
              <br />
              <span>Kelly McCraw</span>
              <br />
            </li>
          </ul>
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
    height: 90vh;
  }

  .hero {
    background-color: #123a15;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpath fill='%23195018' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%2326671e' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%23367e24' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%2348952a' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%235EAD2F' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%237bcd2a' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%239fe132' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%23c2ed41' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%23e3f752' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%23ffff66' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
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
    color: #75ddc6;
    /* text-shadow: 2px 1px 0 #fcf6f3, 4px 3px 0 #ff8f7c; */
    text-shadow: 2px 1px 0 #fcf6f3;
  }

  .hero h1 {
    font-size: 4rem;
    font-style: italic;
  }

  .hero h2 {
    margin: 0;
    margin-top: 0.5rem;
    color: #fcf6f3;
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

  .about__credits {
    padding: 3rem 0;
    padding-right: 3rem;
    max-width: 500px;
    color: #4d4762;
  }
  .about__credits img {
    width: 300px;
    border-radius: 50%;
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
`;
