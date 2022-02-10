import { saveNewAct3SceneToLocalStorage } from './localStorage';

const sceneUnlockingHandler = (dialogueID) => {
  console.log({ dialogueID });
  switch (dialogueID) {
    case 'fabdef5e-fd4a-489b-92f0-375195b5e6ba': // NENN3 Start
      saveNewAct3SceneToLocalStorage('4ff83976-69df-4123-86a8-e764f671d0f7', {
        name: 'Photos',
        dialogueID: '5a208552-f524-46c7-aefc-8eaabc09c9c8',
      });
      return {
        updateReduxSceneObj: {
          conversationID: '4ff83976-69df-4123-86a8-e764f671d0f7',
          upcomingScene: {
            name: 'Photos',
            dialogueID: '5a208552-f524-46c7-aefc-8eaabc09c9c8',
          },
        },
      };
    default:
      return false;
  }
};

export default sceneUnlockingHandler;
