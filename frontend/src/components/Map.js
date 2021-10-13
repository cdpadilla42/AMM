import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { toggleInventory, switchConversation } from '../store/dialogue';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import newLeafMap from '../imgs/newLeafMap.jpg';

const StyledMap = styled.div`
  position: relative;
  width: 100%;
  height: 466px; // originally 350px
  /* z-index: 6; */
  border: 1px solid black;
  background-image: url(${newLeafMap});
  background-size: cover;
  background-position: center;
  border-radius: 5px;

  /* Use below for seeing click boxes */
  /* & > * {
    border: 1px solid green;
  } */

  & > .click_box {
    background-color: rgba(0, 0, 0, 0);
    &:hover,
    &:active {
      -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
      -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
      box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
      cursor: pointer;
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
  const currentDialogueObj = useCurrentDialogueObj();
  const dispatch = useDispatch();

  const requiredEvidence = currentDialogueObj.requiredEvidence;
  const nextResponseID =
    currentDialogueObj.responseOptions[0].followingDialogue._id;

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
    } else {
      console.log('Soooorrry, wrong one', selectedRegion, requiredEvidence);
    }
  }

  return (
    <>
      <StyledMap onClick={presentLocation}>
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
      </StyledMap>
    </>
  );
};

export default Map;
