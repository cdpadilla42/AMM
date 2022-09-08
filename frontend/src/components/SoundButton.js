import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import backpack from '../imgs/Bag_NH_Inv_Icon.png';
import { useLocation, useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeOff } from '@fortawesome/free-solid-svg-icons';
import { Howl, Howler } from 'howler';
import { useState } from 'react';
import { useMemo } from 'react';

const SoundButton = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundIndex, setSoundIndex] = useState(0);
  const [count, setCount] = useState(0);

  console.log(params.id);
  const howlerRef = useRef({});
  const sounds = useRef([
    {
      name: 'Merengue',
      src: 'https://cdn.sanity.io/files/qvonp967/production/f4163ffd79e09fdc32d028a1722ef8949fb31b85.mp3',
      conversationIDs: [
        '27f4be58-38f3-4321-bbc9-c76e0c675c36',
        'd008519f-16c0-4ef0-b790-f5eb0cb3b0b4',
      ],
      howl: null,
    },
    {
      name: 'Chadder',
      src: 'https://cdn.sanity.io/files/qvonp967/production/4606e7ec6208df214d766776e3d5ed33408fe74d.mp3',
      conversationIDs: [
        'e1688c5f-218a-4656-ad96-df9a1c33b8f8',
        'a81fb6a7-d450-45e8-a942-e5c82fb1a812',
      ],
      howl: null,
    },
    {
      name: 'Katt',
      src: 'https://cdn.sanity.io/files/qvonp967/production/0d6b5b52b5cf8ef3eff2e6fd199fb01aa3a30e78.mp3',
      conversationIDs: [
        '4d010f4f-21db-4f11-b427-d4d99e55df0c',
        'e6443c66-4692-4033-926f-eebdf5100efb',
      ],
      howl: null,
    },
    {
      name: 'Stitches',
      src: 'https://cdn.sanity.io/files/qvonp967/production/375967ec87674aa55bebdc18ba13ae5d9b70f211.mp3',
      conversationIDs: [
        '4ff83976-69df-4123-86a8-e764f671d0f7',
        '98b647a0-bb03-4e5c-b34f-bbdecaa6445d',
      ],
      howl: null,
    },
    {
      name: 'Julian',
      src: 'https://cdn.sanity.io/files/qvonp967/production/4ea4c729afc75f801fee429df7234661b2c7780e.mp3',
      conversationIDs: [
        '10350fa4-4c5a-4128-962e-008511bd9bc3',
        '65c247c3-947b-4444-bf08-b7aed9c4c89b',
      ],
      howl: null,
    },
    {
      name: 'Elvis and Sterling',
      src: 'https://cdn.sanity.io/files/qvonp967/production/551dea3c10448155ab883cab280d273ed21122b4.mp3',
      conversationIDs: [
        'd44a5dac-b32a-46b9-b86e-45e84e4dd106',
        'dc7bef1f-856e-4b3d-bd79-159d321aa813',
        '32bbe59e-42d3-4295-8c23-f6018ed28bb1',
        '2e8e6a1d-6267-4e58-8ef2-2d50edab7d28',
      ],
      howl: null,
    },
    {
      name: 'Lucky',
      src: 'https://cdn.sanity.io/files/qvonp967/production/39670c47fc60ddbbe1a6101397be464528f5bbfa.mp3',
      conversationIDs: [
        '339510d1-abf9-44ce-8426-d34f623eef2f',
        '2a5427bf-3266-4a48-b204-5001a45fdef0',
        '09b9f6f2-59f8-4858-a38d-4503977dbb89',
      ],
      howl: null,
    },
    {
      name: 'Ankha',
      src: 'https://cdn.sanity.io/files/qvonp967/production/fb4d319d74b03704096425a6c565760216263f79.mp3',
      conversationIDs: [
        '7aa1ca81-9a27-4d5c-a75b-3624ca6522be',
        '664db36f-6324-4828-a8ad-35c78f5180f1',
      ],
      howl: null,
    },
    {
      name: 'Nenn',
      src: 'https://cdn.sanity.io/files/qvonp967/production/ffd8a238b84a42a2fb05839bf7c395705d7df841.mp3',
      conversationIDs: [
        'b4f841cb-0b75-4d6e-b76f-e2bc3fddbaf5',
        '729d0b36-6021-4843-8e09-da92c651022f',
      ],
      howl: null,
    },
    {
      name: 'Agent S',
      src: 'https://cdn.sanity.io/files/qvonp967/production/d217aedc4593a30a79dc91226739abdc74f45f23.mp3',
      conversationIDs: [
        '1bb0bef9-dee9-415f-beaa-8570240b8d27',
        '2fb98be2-edb3-482d-a50c-abff0b02af56',
        '656278f2-8610-4a94-93e8-c75acafce071',
        'aabe65bf-af66-44ad-a921-aa5cc6790a7a',
      ],
      howl: null,
    },
    {
      name: 'Main Theme',
      src: 'https://cdn.sanity.io/files/qvonp967/production/273c116e4fe97627316713e43e1080a8765d6e6d.mp3',
      playOnMainPage: true,
      conversationIDs: [],
      howl: null,
    },
  ]);

  const currentTrackObj = useMemo(() => {
    return sounds.current.find((soundObj) =>
      soundObj.conversationIDs.includes(params.id)
    );
  }, [params.id]);

  // const transitionSounds = () => {
  //   let newIndex = soundIndex + 1;
  //   if (newIndex > sounds.current.length - 1) {
  //     newIndex = 0;
  //   }

  //   console.log(newIndex);
  //   setSoundIndex(newIndex);
  //   howlerRef.current.stop();

  //   let howler = sounds.current[newIndex].howl;

  //   if (!howler) {
  //     howler = initiateSound(newIndex);
  //     sounds.current[newIndex].howl = howler;
  //   }

  //   howler.play();

  //   howlerRef.current = sounds.current[newIndex].howl;
  // };

  useEffect(() => {
    if (currentTrackObj) {
      const howler = initiateSound(currentTrackObj.src);
      currentTrackObj.howl = howler;
      howlerRef.current = currentTrackObj.howl;
    }

    return () => howlerRef.current.stop();
  }, [currentTrackObj]);

  const initiateSound = (src) => {
    const sound = new Howl({
      src,
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
