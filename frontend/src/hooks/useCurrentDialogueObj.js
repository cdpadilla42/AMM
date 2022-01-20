import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { switchConversation, updateCurrentDialogueID } from '../store/dialogue';

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

  const [currentDialogueObj, setCurrentDialogueObj] = useState({});

  const getActThreeConversationSceneObject = (conversationID) => {
    const conversationObj = actThreeScenes[conversationID];
    const scene = conversationObj?.scene;
    return scene;
  };

  console.log(currentAct);

  useEffect(() => {
    if (inquiryDialogue) {
      // currentDialogueObj set to inquiry object
      setCurrentDialogueObj(
        inquiryList.find(
          (inquiryObj) => inquiryObj.name === currentInquiryDialogue
        )
      );
      return;
    }

    if (currentAct === 'c' && params.id) {
      const currentUserSceneObject = getActThreeConversationSceneObject(
        params.id
      );
      if (!currentDialogueID) {
        if (
          currentUserSceneObject?.name &&
          currentUserSceneObject?.name !== 'Start' &&
          dialogueList
        ) {
          dispatch(switchConversation(currentUserSceneObject.dialogueID));
          const startingScene = dialogueList.find((dialogue) =>
            dialogue?._id?.includes(currentUserSceneObject.dialogueID)
          );
          setCurrentDialogueObj(startingScene);
          // return startingScene;
          return;
        }
      }
    }

    if (!currentDialogueID) {
      setCurrentDialogueObj(
        dialogueList.find((dialogue) => dialogue.name.includes('Start'))
      );
    } else if (currentDialogueID === 'Incorrect') {
      setCurrentDialogueObj({
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
      });
    } else if (currentDialogueID === 'Come Back Later') {
      setCurrentDialogueObj({
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
      });
    } else {
      console.log('HITTING DEFAULT');
      setCurrentDialogueObj(
        dialogueList.find((dialogue) => dialogue._id === currentDialogueID)
      );
    }
  }, [
    inquiryDialogue,
    currentDialogueID,
    currentAct,
    dialogueList,
    inquiryList,
    actThreeScenes,
    inquiryDialogue,
    currentInquiryDialogue,
    params.id,
  ]);

  console.log({ currentDialogueObj });

  return currentDialogueObj;
};

export default useCurrentDialogueObj;
