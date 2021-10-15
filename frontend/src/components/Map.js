import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  toggleInventory,
  switchConversation,
  displayInvalidEvidenceDialogue,
} from '../store/dialogue';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import newLeafMap from '../imgs/newLeafMap.jpg';
import { hideHealthBar, loseHealth } from '../store/health';

const StyledMap = styled.div`
  position: relative;
  width: 100%;
  height: 466px; // originally 350px
  /* z-index: 6; */
  border: 1px solid black;
  border-radius: 5px;
  margin: 0;
  padding: 0 !important;
  overflow: scroll;
  
  /* Use below for seeing click boxes */
  /* & > * {
  } */
  
  & > .click_boxes_container > .click_box {
    background-color: transparent;
    border: 1px solid green;
    &:hover,
    &:active {
      -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
      -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
      box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
      cursor: pointer;
    }
  }
  
  .click_boxes_container {
    background-image: url(${newLeafMap});
    background-size: cover;
    background-position: center;
    margin: 0;
    padding: 0;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: transparent;
    @media all and (max-width: 600px) {
      width: 676px;
      height: 463px:
    }
  }

  .julian {
    position: absolute;
    top: 70px;
    left: 99px;
    width: 122px;
    height: 103px;
  }

  .ankha {
    position: absolute;
    top: 80px;
    left: 453px;
    width: 122px;
    height: 121px;
  }

  .agent_s {
    position: absolute;
    top: 67px;
    left: 379px;
    width: 75px;
    height: 50px;
  }

  .stitches {
    position: absolute;
    top: 80px;
    left: 269px;
    width: 92px;
    height: 63px;
  }

  .elvis {
    position: absolute;
    top: 199px;
    left: 105px;
    width: 147px;
    height: 58px;
  }

  .sterling {
    position: absolute;
    top: 256px;
    left: 105px;
    width: 89px;
    height: 51px;
  }

  .lucky {
    position: absolute;
    top: 381px;
    left: 98px;
    width: 92px;
    height: 73px;
  }

  .crime_scene {
    position: absolute;
    top: 381px;
    left: 260px;
    width: 71px;
    height: 48px;
  }

  .katt {
    position: absolute;
    top: 390px;
    left: 477px;
    width: 102px;
    height: 60px;
  }

  .merengue {
    position: absolute;
    top: 260px;
    left: 488px;
    width: 88px;
    height: 34px;
  }

  .chadder {
    position: absolute;
    top: 219px;
    left: 482px;
    width: 93px;
    height: 38px;
  }

  .nenn {
    position: absolute;
    top: 175px;
    left: 252px;
    width: 176px;
    height: 175px;
  }

  .mailboxes {
    position: absolute;
    top: 323px;
    left: 396px;
    width: 43px;
    height: 39px;
  }

  /* .inventory_header {
    width: 100%;
    border: 1px solid black;
  }

  .inventory_grid {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
    height: calc(100% - 2rem);
    width: 100%;
  }

  div {
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem 0;
    background-color: #fff;
  }

  img {
    width: 80px;
    height: 80px;
  }

  span {
    display: block;
    flex: 1;
  } */
`;

const Map = () => {
  const isMapOpen = useSelector((state) => state.dialogue.isMapOpen);
  const currentDialogueObj = useCurrentDialogueObj();
  const dispatch = useDispatch();
  const outerRef = useRef();
  const innerRef = useRef();

  const requiredEvidence = currentDialogueObj.requiredEvidence;
  const nextResponseID =
    currentDialogueObj.responseOptions[0].followingDialogue._id;

  useEffect(() => {
    if (isMapOpen) {
      console.log(innerRef.current.clientWidth, outerRef.current.clientWidth);
      const scroll =
        (innerRef.current.clientWidth - outerRef.current.clientWidth) / 2;
      console.log(scroll);
      outerRef.current.scrollLeft = scroll;
    }
  }, [isMapOpen]);

  function presentLocation(e) {
    const selectedRegion = e.target.dataset.region;
    let isMatch = false;
    if (
      !Array.isArray(requiredEvidence) &&
      selectedRegion === requiredEvidence
    ) {
      console.log('Presenting', selectedRegion);
      isMatch(true);
    } else if (Array.isArray(requiredEvidence)) {
      const matchedEvidence = requiredEvidence.find(
        (evidence) => evidence.name === selectedRegion
      );
      if (matchedEvidence) isMatch = true;
    }

    if (isMatch) {
      dispatch(switchConversation(nextResponseID));
      dispatch(toggleInventory());
      dispatch(hideHealthBar());
    } else {
      dispatch(displayInvalidEvidenceDialogue());
      if (currentDialogueObj.loseHealthOnIncorrect) {
        dispatch(loseHealth());
      }
    }
    dispatch(toggleInventory());
  }

  const genW = (value) => {
    return (value / 676) * 100;
  };

  return (
    <>
      <StyledMap onClick={presentLocation} ref={outerRef}>
        <div className="click_boxes_container" ref={innerRef}>
          <div className="click_box julian" data-region="Julian Falls" />
          <div className="click_box ankha" data-region="ankha" />
          <div className="click_box agent_s" data-region="agent_s" />
          <div className="click_box stitches" data-region="stitches" />
          <div className="click_box elvis" data-region="elvis" />
          <div className="click_box sterling" data-region="sterling" />
          <div className="click_box lucky" data-region="lucky" />
          <div className="click_box crime_scene" data-region="Crime Scene" />
          <div className="click_box katt" data-region="katt" />
          <div className="click_box merengue" data-region="merengue" />
          <div className="click_box chadder" data-region="chadder" />
          <div className="click_box nenn" data-region="nenn" />
          <div className="click_box mailboxes" data-region="mailboxes" />
        </div>
      </StyledMap>
    </>
  );
};

export default Map;
