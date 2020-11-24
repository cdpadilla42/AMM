import { useSelector } from 'react-redux';

const useCurrentDialogueObj = () => {
  const { currentDialogueID, dialogue: dialogueList } = useSelector(
    (state) => state.dialogue
  );

  let currentDialogueObj;

  if (!currentDialogueID) {
    currentDialogueObj = dialogueList.find(
      (dialogue) => dialogue.name === 'Start'
    );
  } else {
    currentDialogueObj = dialogueList.find(
      (dialogue) => dialogue._id === currentDialogueID
    );
  }

  return currentDialogueObj;
};

export default useCurrentDialogueObj;