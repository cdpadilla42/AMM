import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import '../styles/testimony.css';
import AnimalsDisplayController from '../components/AnimalsDisplayController';
import PatternedBG from '../imgs/patternedbgs/aabg2.jpg';
import StartDisplay from '../components/StartDisplay';

const StartPage = (props) => {
  const backgroundURLs = useSelector(
    (state) => state.conversations?.backgroundURL?.backgroundURL
  );

  const sanityImageUrlParams = useMemo(() => {
    const vw = window.innerWidth;
    if (!vw) return;
    return vw <= 420 ? `` : `?w=755`;
  }, []);

  // Extract backgrounds and append sanity params

  // const fallbackBG = backgroundURLs?.image?.asset.url + sanityImageUrlParams;
  // const desktopBG = backgroundURLs?.desktop?.asset.url
  //   ? backgroundURLs?.desktop?.asset.url + sanityImageUrlParams
  //   : fallbackBG;
  // const phoneBG = backgroundURLs?.phone?.asset.url
  //   ? backgroundURLs?.phone?.asset.url
  //   : desktopBG;

  return (
    <StyledContainer
      className="container"
      fallback="https://cdn.sanity.io/images/qvonp967/production/f2713d2b4c3b4e322a230ae4d65cde1cd264df4f-755x765.png?w=755"
      desktop="https://cdn.sanity.io/images/qvonp967/production/f2713d2b4c3b4e322a230ae4d65cde1cd264df4f-755x765.png?w=755"
      phone="https://cdn.sanity.io/images/qvonp967/production/f2713d2b4c3b4e322a230ae4d65cde1cd264df4f-755x765.png?w=755"
      PatternedBG={PatternedBG}
    >
      <div className="desktop_main_background" />
      <div className="game_container">
        <StartDisplay />
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  background-image: url(${PatternedBG});
  background-repeat: repeat;

  .desktop_main_background {
    width: 755px;
    height: 765px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-repeat: no-repeat;
    background-position: center;
    background: rgb(188, 221, 200)
      url(${(props) => props.desktop || props.fallback});
    background-size: cover;
    border: 1px solid #8193e3;

    @media all and (max-width: 420px) {
      display: none;
    }
  }

  @media all and (max-width: 420px) {
    background-image: url(${(props) => props.phone || props.fallback});
    background-size: initial;
  }

  @media all and (min-width: 400px) and (max-width: 500px) {
    background-size: cover;
  }
`;

export default StartPage;
