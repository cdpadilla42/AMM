import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import normal from '../imgs/normal.png';
import mad from '../imgs/mad.png';
import laugh from '../imgs/laugh.png';
import sad from '../imgs/sad.png';
import sleep from '../imgs/sleep.png';

const AnimalDisplay = ({
  speaker: speakerFromProps,
  emotion: emotionFromProps,
  orientation,
  isCurrentSpeaker,
  direction,
  centered,
  showMobileOptimizedImages,
}) => {
  const { sprites } = useSelector((state) => state.sprites);
  const dialogue = useCurrentDialogueObj();
  const { currentDialoguePosition } = useSelector((state) => state.dialogue);
  const speaker =
    speakerFromProps || dialogue?.phrase[currentDialoguePosition]?.speaker.name;
  let emotion =
    emotionFromProps ||
    dialogue?.phrase?.[currentDialoguePosition]?.emotion?.emotion;

  const spriteObj = sprites?.find((sprite) => sprite.name === speaker);
  const spriteUrl =
    spriteObj?.images.find((image) => image.emotion.emotion === emotion)
      ?.spriteUrl || ''; // Previously big chungus. RIP buddy.

  const animalImages = {
    normal,
    mad,
    laugh,
    sad,
    sleep,
  };

  if (!animalImages[emotionFromProps]) emotionFromProps = 'normal';
  let className;
  if (centered) {
    className = 'game_container__animal_image single';
  } else if (orientation === 'left') {
    className = 'game_container__animal_image left';
  } else if (orientation === 'right') {
    className = 'game_container__animal_image right';
  } else {
    className = 'game_container__animal_image single';
  }

  if (!isCurrentSpeaker) {
    className += ' inactive';
  }
  if (direction) {
    className += ` ${direction}_facing`;
  }

  const optimizedSpriteUrl = useMemo(() =>
    showMobileOptimizedImages
      ? `${spriteUrl}?w=258&h=284`
      : `${spriteUrl}?w=405&h=446`
  );

  if (!spriteUrl) return <div></div>;

  return <img src={optimizedSpriteUrl} alt="" className={className} />;
  // return (
  //   <div className="game_container__animal">
  //     <img src={spriteUrl} alt="" className={className} />
  //   </div>
  // );
};

AnimalDisplay.propTypes = {
  isCurrentSpeaker: PropTypes.bool,
  direction: PropTypes.string,
  showMobileOptimizedImages: PropTypes.bool,
};

AnimalDisplay.defaultProps = {
  isCurrentSpeaker: true,
  showMobileOptimizedImages: false,
};

export default AnimalDisplay;
