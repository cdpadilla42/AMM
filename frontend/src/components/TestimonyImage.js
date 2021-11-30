import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';

// https://cdn.sanity.io/images/qvonp967/production/e47c279cf3b65c919672a8a29225048dbc639f2e-1480x1042.jpg

const TestimonyImage = () => {
  const [currentImage, setCurrentImage] = useState('');
  const currentDialogueObj = useCurrentDialogueObj();
  const { currentDialoguePosition } = useSelector((state) => state.dialogue);
  const phrases = currentDialogueObj && currentDialogueObj.phrase;
  const currentPhrase = phrases?.[currentDialoguePosition] || {};
  const { imageUrl, showImage } = currentPhrase;

  useEffect(() => {
    if (imageUrl) {
      setCurrentImage(currentPhrase.imageUrl);
    } else if (!showImage) {
      setCurrentImage('');
    }
    // Else, keep the current image as is if showImage is set to on and there is no new image
  }, [imageUrl, showImage]);

  if (currentImage === '') return '';

  return (
    <StyledTestimonyImage>
      <img src={currentImage} alt="Shocking Evidence! Image Name Here!" />
    </StyledTestimonyImage>
  );
};

export default TestimonyImage;

const StyledTestimonyImage = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-50% - 125px));
  position: absolute;
  color: var(--cream);
  background-color: var(--brown-black);
  border-radius: 20px;
  padding: 1rem;
  display: inline-block;
  z-index: 100;
  img {
    max-width: 600px;
    max-height: 400px;

    @media all and (max-width: 420px) {
      max-width: 80vw;
      max-height: 250px;
    }
  }
`;
