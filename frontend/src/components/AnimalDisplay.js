import React from 'react';
import { useSelector } from 'react-redux';
import useCurrentDialogueObj from '../hooks/useCurrentDialogueObj';
import normal from '../imgs/normal.png';
import mad from '../imgs/mad.png';
import laugh from '../imgs/laugh.png';
import sad from '../imgs/sad.png';
import sleep from '../imgs/sleep.png';

const AnimalDisplay = () => {
  const dialogue = useCurrentDialogueObj();
  const { currentDialoguePosition } = useSelector((state) => state.dialogue);
  const { sprites } = useSelector((state) => state.sprites);
  const speaker = dialogue.phrase[currentDialoguePosition].speaker.name;
  let emotion = dialogue.phrase[currentDialoguePosition].emotion.emotion;

  console.log('dialogue', { emotion, speaker });

  const spriteObj = sprites?.find((sprite) => sprite.name === speaker);
  const spriteUrl = spriteObj?.images.find(
    (image) => image.emotion.emotion === emotion
  ).spriteUrl;

  console.log('sprites', sprites);
  console.log({ spriteObj });
  console.log({ spriteUrl });
  const animalImages = {
    normal,
    mad,
    laugh,
    sad,
    sleep,
  };

  if (!animalImages[emotion]) emotion = 'normal';

  return (
    <div className="game_container__animal">
      <img
        src={spriteUrl || normal}
        alt=""
        className="game_container__animal_image"
      />
    </div>
  );
};

export default AnimalDisplay;
