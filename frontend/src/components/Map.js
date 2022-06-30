import React, { useEffect, useRef } from 'react';
import PropTypes from 'react-proptypes';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  toggleInventory,
  switchConversation,
  displayInvalidEvidenceDialogue,
} from '../store/dialogue';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import newLeafMap from '../imgs/newLeafMap.png';
import { hideHealthBar, loseHealth } from '../store/health';

const StyledMap = styled.div`
  position: relative;
  /* z-index: 6; */
  border: 1px solid black;
  border-radius: 5px;
  padding: 0 !important;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0) !important;

  /* Use below for seeing click boxes */
  /* & > * {
    border: 1px solid green;
  } */

  .map_container {
    padding: 0 !important;
    width: 676px;
    height: 466px; // originally 350px
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0);
    @media all and (max-width: 600px) {
      height: 350px;
    }
  }

  .click_boxes_container > .click_box {
    background-color: transparent;
    &:hover,
    &:active {
      -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
      -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
      box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
      cursor: pointer;
      &:after {
        content: attr(data-name);
        color: black;
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
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
      height: 641px;
    }
    /* & > * {
      border: 1px solid green;
    } */
  }

  .julian {
    position: absolute;
    top: 70px;
    left: 99px;
    width: 122px;
    height: 103px;
    @media all and (max-width: 600px) {
      top: 160px;
    }
  }

  .ankha {
    position: absolute;
    top: 80px;
    left: 453px;
    width: 122px;
    height: 121px;
    @media all and (max-width: 600px) {
      top: 170px;
    }
  }

  .agent_s {
    position: absolute;
    top: 67px;
    left: 379px;
    width: 75px;
    height: 50px;
    @media all and (max-width: 600px) {
      top: 156px;
    }
  }

  .stitches {
    position: absolute;
    top: 80px;
    left: 269px;
    width: 92px;
    height: 63px;
    @media all and (max-width: 600px) {
      top: 169px;
    }
  }

  .elvis {
    position: absolute;
    top: 199px;
    left: 105px;
    width: 147px;
    height: 58px;
    @media all and (max-width: 600px) {
      top: 290px;
    }
  }

  .sterling {
    position: absolute;
    top: 256px;
    left: 105px;
    width: 89px;
    height: 51px;
    @media all and (max-width: 600px) {
      top: 345px;
    }
  }

  .lucky {
    position: absolute;
    top: 381px;
    left: 98px;
    width: 92px;
    height: 73px;
    @media all and (max-width: 600px) {
      top: 471px;
    }
  }

  .crime_scene {
    position: absolute;
    top: 381px;
    left: 260px;
    width: 71px;
    height: 48px;
    @media all and (max-width: 600px) {
      top: 473px;
    }
  }

  .katt {
    position: absolute;
    top: 390px;
    left: 477px;
    width: 102px;
    height: 60px;
    @media all and (max-width: 600px) {
      top: 478px;
    }
  }

  .merengue {
    position: absolute;
    top: 260px;
    left: 488px;
    width: 88px;
    height: 34px;
    @media all and (max-width: 600px) {
      top: 346px;
    }
  }

  .chadder {
    position: absolute;
    top: 219px;
    left: 482px;
    width: 93px;
    height: 38px;
    @media all and (max-width: 600px) {
      top: 309px;
    }
  }

  .nenn {
    position: absolute;
    top: 175px;
    left: 252px;
    width: 176px;
    height: 175px;
    @media all and (max-width: 600px) {
      top: 263px;
    }
  }

  .mailboxes {
    position: absolute;
    top: 323px;
    left: 396px;
    width: 43px;
    height: 39px;
    @media all and (max-width: 600px) {
      top: 413px;
    }
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

const Map = ({ onRegionClick }) => {
  const isMapOpen = useSelector((state) => state.dialogue.isMapOpen);
  const currentDialogueObj = useCurrentDialogueObj();
  const dispatch = useDispatch();
  const outerRef = useRef();
  const innerRef = useRef();

  const requiredEvidence = currentDialogueObj.requiredEvidence;

  const nextResponseID =
    currentDialogueObj.followingDialogueFromEvidence?._id ||
    currentDialogueObj.responseOptions?.[0]?.followingDialogue._id;

  useEffect(() => {
    if (isMapOpen) {
      const scroll =
        (innerRef.current.clientWidth - outerRef.current.clientWidth) / 2;
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
      <StyledMap ref={outerRef}>
        <div className="map_container">
          <div className="click_boxes_container" ref={innerRef}>
            <div
              className="click_box julian"
              data-name="Julian Falls"
              onClick={onRegionClick}
            />
            <div
              className="click_box ankha"
              data-name="Ankha's Exhibit"
              onClick={onRegionClick}
            />
            <div
              className="click_box agent_s"
              data-name="Agent S's Base"
              onClick={onRegionClick}
            />
            <div
              className="click_box stitches"
              data-name="Stitches's Playplace"
              onClick={onRegionClick}
            />
            <div
              className="click_box elvis"
              data-name="Elvis's Castle"
              onClick={onRegionClick}
            />
            <div
              className="click_box sterling"
              data-name="Sterling's Fort"
              onClick={onRegionClick}
            />
            <div
              className="click_box lucky"
              data-name="Lucky's Infirmary"
              onClick={onRegionClick}
            />
            <div
              className="click_box crime_scene"
              data-name="Crime Scene"
              onClick={onRegionClick}
            />
            <div
              className="click_box katt"
              data-name="Katt's Junkyard"
              onClick={onRegionClick}
            />
            <div
              className="click_box merengue"
              data-name="Merengue's Bakery"
              onClick={onRegionClick}
            />
            <div
              className="click_box chadder"
              data-name="Chadder's Restaurant"
              onClick={onRegionClick}
            />
            <div
              className="click_box nenn"
              data-name="Ñenn's Ring"
              onClick={onRegionClick}
            />
            <div
              className="click_box mailboxes"
              data-name="Mailroom"
              onClick={onRegionClick}
            />
          </div>
        </div>
      </StyledMap>
    </>
  );
};

Map.propTypes = {
  onRegionClick: PropTypes.func,
};

Map.defaultProps = {
  onRegionClick: () => {},
};

export default Map;
