import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import backpack from '../imgs/Bag_NH_Inv_Icon.png';
import { useLocation, useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeOff } from '@fortawesome/free-solid-svg-icons';
import { Howl, Howler } from 'howler';
import { useState } from 'react';

const SoundButton = () => {
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundIndex, setSoundIndex] = useState(0);
  const [count, setCount] = useState(0);

  const howlerRef = useRef({});
  const sounds = useRef([
    {
      name: 'BBC Radio 1',
      src: 'https://upload.wikimedia.org/score/d/f/df3n3eg53y8z42wgr5vthxm4bofgkv7/df3n3eg5.mp3',
      howl: null,
    },
    {
      name: '88.1 INDIE',
      src: 'https://upload.wikimedia.org/score/0/c/0cg9y4ajzy2jwu8s2887oaq4fwkwbqs/0cg9y4aj.mp3',
      howl: null,
    },
  ]);

  const transitionSounds = () => {
    let newIndex = soundIndex + 1;
    if (newIndex > sounds.current.length - 1) {
      newIndex = 0;
    }

    console.log(newIndex);
    setSoundIndex(newIndex);
    howlerRef.current.stop();

    let howler = sounds.current[newIndex].howl;

    if (!howler) {
      howler = initiateSound(newIndex);
      sounds.current[newIndex].howl = howler;
    }

    howler.play();

    howlerRef.current = sounds.current[newIndex].howl;
  };

  useEffect(() => {
    const howler = initiateSound(soundIndex);
    sounds.current[soundIndex].howl = howler;
    howlerRef.current = sounds.current[soundIndex].howl;
  }, []);

  const initiateSound = (index) => {
    const sound = new Howl({
      src: [sounds.current[index].src],
      loop: true,
      onplay: () => {
        setIsPlaying(true);
      },
      onpause: () => {
        setIsPlaying(false);
      },
    });

    return sound;
  };

  const handleClick = () => {
    if (howlerRef.current && howlerRef.current.playing) {
      if (!isPlaying && !howlerRef.current.playing()) {
        howlerRef.current.play();
      } else {
        howlerRef.current.pause();
      }
    }
  };

  return (
    <StyledSoundButton>
      <div
        className="icon_container"
        onClick={handleClick}
        tabIndex="0"
        data-isPlaying={isPlaying}
      >
        <FontAwesomeIcon
          icon={isPlaying ? faVolumeUp : faVolumeOff}
          color="white"
          size="xs"
          className="open_inventory_button"
        />
      </div>
    </StyledSoundButton>
  );
};

export default SoundButton;

const StyledSoundButton = styled.div`
  position: absolute;
  transition: background-color 0.8s ease;
  z-index: 4;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 755px;
  height: 765px;
  pointer-events: none;
  @media all and (max-width: 420px) {
    top: 0;
    left: 0;
    transform: none;
    width: 100vw;
    height: 100vh; /* Fallback for browsers that do not support Custom Properties */
    height: calc(var(--vh, 1vh) * 100);
    font-size: 1.5rem;
  }

  .icon_container {
    background-color: var(--blue);
    border-radius: 50%;
    padding: 5px;
    width: 44px;
    height: 44px;
    border-radius: 10px;
    border: none;
    font-size: 3rem;
    position: absolute;
    bottom: 10px;
    left: 10px;
    pointer-events: auto;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;

    &[data-isPlaying='true'] .open_inventory_button {
      color: var(--yellow);
    }

    &:hover .open_inventory_button {
      color: var(--green);
    }
  }

  .open_inventory_button {
    color: var(--cream);
    width: 44px;
    height: 44px;
  }
`;
