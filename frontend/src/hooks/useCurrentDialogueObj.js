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
      animals: [{ name: 'Agent S' }],
      phrase: [
        {
          emotion: {
            emotion: 'normal',
          },
          speaker: {
            name: 'Agent S',
            color: {
              hex: '#1e28e1',
            },
          },
          text: 'Ummmm, maybe try again....',
        },
      ],
      name: 'Incorrect',
    };
  } else if (currentDialogueID === 'Come Back Later') {
    currentDialogueObj = {
      animals: [{ name: 'Agent S' }],
      phrase: [
        {
          emotion: {
            emotion: 'normal',
          },
          speaker: {
            name: 'Agent S',
            color: {
              hex: '#1e28e1',
            },
          },
          text: "OK! We need more evidence. Let's come back and pretend we never had this conversation!",
        },
      ],
      name: 'Come Back Later',
      isFinalDialogue: true,
    };
  } else {
    currentDialogueObj = dialogueList.find(
      (dialogue) => dialogue._id === currentDialogueID
    );
  }

  return currentDialogueObj;
};

export default useCurrentDialogueObj;
