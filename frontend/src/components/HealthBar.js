import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { fullRecovery, loseHealth } from '../store/health';

const HealthBar = () => {
  const dispatch = useDispatch();
  const { current: health } = useSelector((state) => state.health);
  const [errorClass, setErroClass] = useState('');
  const healthRef = useRef({ current: 5 });

  useEffect(() => {
    if (health === 0) {
      setTimeout(() => {
        onFullRecover();
      }, 2000);
    }
    if (health < healthRef.current) {
      showErrorAnimation();
    }

    healthRef.current = health;
  }, [health]);

  const onLoseHealthClick = () => {
    if (health === 1) {
      dispatch(loseHealth());
    } else if (health === 0) {
      return;
    } else {
      dispatch(loseHealth());
    }
  };

  const onFullRecover = () => {
    dispatch(fullRecovery());
  };

  const showErrorAnimation = () => {
    setErroClass('ahashakeheartache');
    setTimeout(() => {
      setErroClass('');
    }, 2000);
  };

  const precentage = (health / 5) * 100;
  const calcWidth = `${Math.floor(precentage)}%`;

  return (
    <StyledHealthBar className={errorClass}>
      <div className="meter">
        <span style={{ width: calcWidth }} />
      </div>
      {/* <button type="button" onClick={onLoseHealthClick}>
        Oof
      </button>
      <button type="button" onClick={onFullRecover}>
        Recover
      </button> */}
    </StyledHealthBar>
  );
};

export default HealthBar;

const errorAnimation = keyframes`

  0% {
      transform: translate(calc(0px + 30px), 0px);
    }
    20% {
      transform: translate(calc(0px - 30px ), 0px);
    }
    40% {
      transform: translate(calc(0px + 15px), 0px);
    }
    60% {
      transform: translate(calc(0px - 15px ), 0px);
    }
    80% {
      transform: translate(calc(0px + 8px), 0px);
    }
    100% {
      transform: translate(0px, 0px);
    }
`;

const StyledHealthBar = styled.div`
  width: 200px;
  &.ahashakeheartache {
    animation-name: ${errorAnimation};
    animation-duration: 0.4s;
    animation-iteration-count: 1;
  }
  .meter {
    box-sizing: content-box;
    height: 10px;
    position: relative;
    background: var(--cream);
    border-radius: 25px;
    padding: 4px;
    box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
  }
  .meter > span {
    display: block;
    height: 100%;
    border-radius: 20px;
    background: var(--blue);
    position: relative;
    overflow: hidden;
    transition: width 0.6s ease;
  }

  * {
    box-sizing: border-box;
  }
`;
