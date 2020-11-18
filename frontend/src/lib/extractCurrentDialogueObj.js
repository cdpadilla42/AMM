const extractCurrentDialogueObj = (currentDialogueID, dialogueList) => {
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

export default extractCurrentDialogueObj;
