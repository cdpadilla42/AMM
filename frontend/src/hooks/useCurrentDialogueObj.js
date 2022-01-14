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

    if (!currentDialogueID) {
      console.log('HELLO!');
      setCurrentDialogueObj(
        dialogueList.find((dialogue) => dialogue.name.includes('Start'))
      );

      if (currentAct === 'c' && params.id) {
        const currentUserSceneObject = getActThreeConversationSceneObject(
          params.id
        );

        console.log(currentUserSceneObject);

        if (
          currentUserSceneObject?.name &&
          currentUserSceneObject?.name !== 'Start'
        ) {
          dispatch(switchConversation(currentUserSceneObject.dialogueID));
        }
      }
      console.log({ currentDialogueObj, dialogueList });
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
    params,
  ]);

  return currentDialogueObj;
};

export default useCurrentDialogueObj;
