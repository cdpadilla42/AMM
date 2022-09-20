import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Howl, Howler } from 'howler';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { setPlayedAudio, setSoundPlaying } from '../store/app';
import { wait } from '../lib/util';

const SoundController = ({ children }) => {
  const params = useParams();
  const { pathname } = useLocation();
  const howlerRef = useRef({});
  const { playedAudio, soundPlaying } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const sounds = useRef([
    {
      name: 'Merengue',
      src: 'https://cdn.sanity.io/files/qvonp967/production/27bb9375f9e4d220e6ecef7db9f306829e0ba678.mp3',
      conversationIDs: [
        '27f4be58-38f3-4321-bbc9-c76e0c675c36',
        'd008519f-16c0-4ef0-b790-f5eb0cb3b0b4',
      ],
      howl: null,
    },
    {
      name: 'Chadder',
      src: 'https://cdn.sanity.io/files/qvonp967/production/fd7bc3d5c43e7d288e438eee0832ee3a56c05a8c.mp3',
      conversationIDs: [
        'e1688c5f-218a-4656-ad96-df9a1c33b8f8',
        'a81fb6a7-d450-45e8-a942-e5c82fb1a812',
      ],
      howl: null,
    },
    {
      name: 'Katt',
      src: 'https://cdn.sanity.io/files/qvonp967/production/e3c69578fb4c173a17ae7fec915a30eed93aca89.mp3',
      conversationIDs: [
        '4d010f4f-21db-4f11-b427-d4d99e55df0c',
        'e6443c66-4692-4033-926f-eebdf5100efb',
      ],
      howl: null,
    },
    {
      name: 'Stitches',
      src: 'https://cdn.sanity.io/files/qvonp967/production/0830d85b13c989df982a6d082312a0e34be416f9.mp3',
      conversationIDs: [
        '4ff83976-69df-4123-86a8-e764f671d0f7',
        '98b647a0-bb03-4e5c-b34f-bbdecaa6445d',
      ],
      howl: null,
    },
    {
      name: 'Julian',
      src: 'https://cdn.sanity.io/files/qvonp967/production/a5f68453e84f75ec11527e605848305291276fee.mp3',
      conversationIDs: [
        '10350fa4-4c5a-4128-962e-008511bd9bc3',
        '65c247c3-947b-4444-bf08-b7aed9c4c89b',
      ],
      howl: null,
    },
    {
      name: 'Elvis and Sterling',
      src: 'https://cdn.sanity.io/files/qvonp967/production/d3719cf4b488897b75121c82652c8e9cdd465333.mp3',
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
      src: 'https://cdn.sanity.io/files/qvonp967/production/1e5d92504d756b22a8e71dd8c067539e47531f8a.mp3',
      conversationIDs: [
        '339510d1-abf9-44ce-8426-d34f623eef2f',
        '2a5427bf-3266-4a48-b204-5001a45fdef0',
        '09b9f6f2-59f8-4858-a38d-4503977dbb89',
      ],
      howl: null,
    },
    {
      name: 'Ankha',
      src: 'https://cdn.sanity.io/files/qvonp967/production/fde29904989c0a164602a818468cda21b435ba08.mp3',
      conversationIDs: [
        '7aa1ca81-9a27-4d5c-a75b-3624ca6522be',
        '664db36f-6324-4828-a8ad-35c78f5180f1',
      ],
      howl: null,
    },
    {
      name: 'Nenn',
      src: 'https://cdn.sanity.io/files/qvonp967/production/5923bae1f61978740e6e3a7378cffab3f9482b00.mp3',
      conversationIDs: [
        'b4f841cb-0b75-4d6e-b76f-e2bc3fddbaf5',
        '729d0b36-6021-4843-8e09-da92c651022f',
      ],
      howl: null,
    },
    {
      name: 'Agent S',
      src: 'https://cdn.sanity.io/files/qvonp967/production/badd7cf97965dcdf59272260e12af7e22eb773d5.mp3',
      conversationIDs: [
        '1bb0bef9-dee9-415f-beaa-8570240b8d27',
        '2fb98be2-edb3-482d-a50c-abff0b02af56',
        '656278f2-8610-4a94-93e8-c75acafce071',
        'aabe65bf-af66-44ad-a921-aa5cc6790a7a',
        'b3e19861-c61c-43ec-b48d-51ae7eacbd14',
      ],
      howl: null,
    },
    {
      name: 'Victory Theme',
      src: 'https://cdn.sanity.io/files/qvonp967/production/f08d13c5d515b2fd31d19e118c08fdf7dd0a76d2.mp3',
      conversationIDs: ['1aad77e1-bbbf-4fad-bf79-fae82ebbdd0e'],
      howl: null,
    },
    {
      name: 'Trial Start Theme',
      src: 'https://cdn.sanity.io/files/qvonp967/production/e9ca3911d8a2474b12e1505f53ed1ae6f2efa455.mp3',
      conversationIDs: [
        'd2c9e39a-269d-4e45-9762-43156e860643',
        '0dbabd60-007b-45a6-83bb-f7616d341a15',
        '10a0bd5d-70a1-422a-a02e-11e1078f7000',
      ],
      howl: null,
    },
    {
      name: 'Boss Theme',
      src: 'https://cdn.sanity.io/files/qvonp967/production/ce21ba12c81a71c801a62819c620ab0cd853f3db.mp3',
      conversationIDs: [
        'cea264b4-3530-4521-8fc2-f6c0e92b1745',
        'e5b470ca-5b8e-4f2e-a6b0-8743cfcb0c59',
      ],
      howl: null,
    },
    {
      name: 'Epilogue Theme',
      src: 'https://cdn.sanity.io/files/qvonp967/production/1c348c7252824743d763728f5efb6f8ea8ce4300.mp3',
      conversationIDs: ['56cc2315-f580-4116-bf9d-be350ea15e10'],
      howl: null,
    },
    {
      name: 'Main Theme',
      src: 'https://cdn.sanity.io/files/qvonp967/production/273c116e4fe97627316713e43e1080a8765d6e6d.mp3',
      playOnMainPage: true,
      conversationIDs: [],
      howl: null,
      noLoop: true,
    },
  ]);

  const parsePathname = (pathname) => {
    const pathnameArray = pathname.split('/');
    // ['', 'testimony', ':id']
    if (pathnameArray.length === 3) {
      return pathnameArray[2];
    } else {
      return pathnameArray[1];
    }
  };

  const currentPage = useMemo(() => {
    return parsePathname(pathname);
  }, [pathname]);

  const currentTrackObj = useMemo(() => {
    if (
      currentPage === 'act-one' ||
      currentPage === 'play' ||
      currentPage === 'act-three'
    ) {
      return sounds.current.find((soundObj) => soundObj.playOnMainPage);
    }
    return sounds.current.find((soundObj) =>
      soundObj.conversationIDs.includes(currentPage)
    );
  }, [currentPage]);

  useEffect(() => {
    const asyncEffect = async () => {
      await wait(2000);
      if (currentTrackObj && soundPlaying) {
        let howler;

        if (currentTrackObj.howl) {
          howler = currentTrackObj.howl;
        } else {
          howler = initiateSound(currentTrackObj.src, currentTrackObj.noLoop);
        }

        if (soundPlaying) {
          fadeOutCurrentTrack(howlerRef.current);
        }

        currentTrackObj.howl = howler;
        howlerRef.current = currentTrackObj.howl;
        if (soundPlaying) {
          currentTrackObj.howl.play();
          currentTrackObj.howl.fade(0, 1, 1000);
        }
      }
    };

    asyncEffect();

    return () => {
      if (howlerRef.current && howlerRef.current.stop) {
        fadeOutCurrentTrack(howlerRef.current);
      }
    };
  }, [currentTrackObj, soundPlaying]);

  const fadeOutCurrentTrack = async (howl) => {
    const waitLength = 1000;
    if (currentTrackObj?.howl) {
      howl.fade(1, 0, waitLength);
      await wait(waitLength);
      howl.stop();
    }
  };

  const initiateSound = (src, noLoop) => {
    const sound = new Howl({
      src,
      loop: !noLoop,
    });

    return sound;
  };

  useEffect(() => {
    if (!playedAudio) {
      dispatch(setPlayedAudio(true));
    }

    if (howlerRef.current && howlerRef.current.playing) {
      if (soundPlaying && !howlerRef.current.playing()) {
        howlerRef.current.play();
      } else {
        howlerRef.current.pause();
      }
    }
  }, [soundPlaying, howlerRef.current]);

  return '';
};

export default SoundController;
