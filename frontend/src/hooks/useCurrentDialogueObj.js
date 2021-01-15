import { useSelector } from 'react-redux';

const useCurrentDialogueObj = () => {
  const {
    currentDialogueID,
    prevDialogueID,
    dialogue: dialogueList,
  } = useSelector((state) => state.dialogue);

  let currentDialogueObj;

  if (!currentDialogueID) {
    currentDialogueObj = dialogueList.find((dialogue) =>
      dialogue.name.includes('Start')
    );
  } else if (currentDialogueID === 'Incorrect') {
    currentDialogueObj = {
      phrase: [
        {
          emotion: {
            emotion: 'normal',
          },
          speaker: {
            name: 'Agent S',
          },
          text: 'Ummmm, maybe try again....',
        },
      ],
      name: 'Incorrect',
    };
  } else {
    currentDialogueObj = dialogueList.find(
      (dialogue) => dialogue._id === currentDialogueID
    );
  }

  return currentDialogueObj;
};

export default useCurrentDialogueObj;
