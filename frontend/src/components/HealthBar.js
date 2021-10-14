import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fullRecovery, loseHealth } from '../store/health';

const HealthBar = () => {
  const dispatch = useDispatch();
  const { current: health } = useSelector((state) => state.health);

  const onLoseHealthClick = () => {
    if (health === 1) {
      console.log('You lose!');
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

  const precentage = (health / 5) * 100;
  const calcWidth = `${Math.floor(precentage)}%`;

  return (
    <StyledHealthBar>
      <div className="meter">
        <span style={{ width: calcWidth }} />
      </div>
      <span>{health}</span>
      <button type="button" onClick={onLoseHealthClick}>
        Oof
      </button>
      <button type="button" onClick={onFullRecover}>
        Recover
      </button>
    </StyledHealthBar>
  );
};

export default HealthBar;

const StyledHealthBar = styled.div`
  width: 200px;
  .meter {
    box-sizing: content-box;
    height: 10px; /* Can be anything */
    position: relative;
    /* margin: 60px 0 20px 0; Just for demo spacing */
    background: #fff9e5;
    border-radius: 25px;
    padding: 4px;
    box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
  }
  .meter > span {
    display: block;
    height: 100%;
    border-radius: 20px;
    background: #0c8ecb;
    position: relative;
    overflow: hidden;
    transition: width 0.6s ease;
  }

  * {
    box-sizing: border-box;
  }
`;