import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { switchConversation } from '../store/dialogue';

const useCurrentDialogueObj = () => {
  const dispatch = useDispatch();
  const {
    currentDialogueID,
    prevDialogueID,
    dialogue: dialogueList,
    inquiry: inquiryList,
  } = useSelector((state) => state.dialogue);
  const currentAct = useSelector(
    (state) => state.conversations?.conversation?.[0]?.act
  );
  const actThreeScenes = useSelector((state) => state.act3Scenes);
  const { inquiryDialogue } = useSelector((state) => state.app);
  const { currentInquiryDialogue } = useSelector((state) => state.inquiry);
  const params = useParams();

  let currentDialogueObj;

  const getActThreeConversationSceneObject = (conversationID) => {
    const conversationObj = actThreeScenes[conversationID];
    const scene = conversationObj?.scene;
    return scene;
  };

  if (inquiryDialogue) {
    // currentDialogueObj set to inquiry object
    currentDialogueObj = inquiryList.find(
      (inquiryObj) => inquiryObj.name === currentInquiryDialogue
    );
    return currentDialogueObj;
  }

  if (!currentDialogueID) {
    console.log('HELLO!');
    // TODO Don't switch dialogue from here, simply load the necessary one
    if (currentAct === 'c' && params.id) {
      const currentUserSceneObject = getActThreeConversationSceneObject(
        params.id
      );

      console.log(currentUserSceneObject);

      if (
        currentUserSceneObject?.name &&
        currentUserSceneObject?.name !== 'Start'
      ) {
        // set initial dialogue to the id through redux
        currentDialogueObj = dialogueList.find(
          (dialogueObj) => dialogueObj._id === currentUserSceneObject.dialogueID
        );
        console.log(currentDialogueObj, dialogueList, params.id);
      }
    } else {
      currentDialogueObj = dialogueList.find((dialogue) =>
        dialogue.name.includes('Start')
      );
    }
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
