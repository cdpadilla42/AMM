import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { dialogueIDConstants, specialDialoguesObject } from '../lib/constants';
import { setSceneShifted } from '../store/app';
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
  const { prereqs } = useSelector((state) => state.inventory);
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
      let currentInquiryObj = inquiryList.find(
        (inquiryObj) => inquiryObj.name === currentInquiryDialogue
      );

      if (!currentInquiryObj) {
        currentInquiryObj = inquiryList.find((inquiryObj) =>
          inquiryObj.name.match(new RegExp(currentInquiryDialogue, 'gi'))
        );
      }

      if (currentInquiryObj?.prereqRef?.name) {
        if (!prereqs[currentInquiryObj.prereqRef.name]) {
          setCurrentDialogueObj(
            // false one
            {
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
                  text: 'My super-hero-detective-gut is kicking in, and it’s saying we should wait to present this item to this person until later.',
                },
              ],
              name: 'Prereq',
            }
          );
          return;
        }
      }
      setCurrentDialogueObj(currentInquiryObj);
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
          dispatch(setSceneShifted(true));
          // return startingScene;
          return;
        }
      }
    }

    if (!currentDialogueID) {
      setCurrentDialogueObj(
        dialogueList.find((dialogue) => dialogue.name.includes('Start'))
      );
      // In redux, save the current Dialogue ID
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
    } else if (currentDialogueID === 'Julian Trial 2 Forfit') {
      setCurrentDialogueObj({
        animals: [{ name: 'Julian' }],
        phrase: [
          {
            emotion: {
              emotion: 'Smirking',
            },
            speaker: {
              name: 'Julian',
              color: {
                hex: '#1e28e1',
              },
            },
            text: 'Not so clever, are you detectives?',
          },
        ],
        name: 'Julian Trial 2 Forfit Incorrect',
      });
    } else if (currentDialogueID === 'Incorrect Elvis3') {
      const incorrectScene = dialogueList.find((dialogue) =>
        dialogue?._id?.includes('d5e6e234-a8b9-4dfd-87fe-7fa8f00467ab')
      );
      setCurrentDialogueObj(incorrectScene);
    } else if (currentDialogueID === 'Julian Trial 2 Forfit') {
      const incorrectScene = dialogueList.find((dialogue) =>
        dialogue?._id?.includes(
          specialDialoguesObject['ACT2 JULIAN TRIAL TAUNT']
        )
      );
      setCurrentDialogueObj(incorrectScene);
    } else if (currentDialogueID === 'Incorrect Elvis3 third time') {
      const incorrectScene = dialogueList.find((dialogue) =>
        dialogue?._id?.includes(
          specialDialoguesObject['ELVIS3 BEFORE WARMUP 2 wrong third time']
        )
      );
      setCurrentDialogueObj(incorrectScene);
    } else if (currentDialogueID === 'Incorrect Elvis3 sixth time') {
      const incorrectScene = dialogueList.find((dialogue) =>
        dialogue?._id?.includes(
          specialDialoguesObject['ELVIS3 BEFORE WARMUP 2 wrong sixth time']
        )
      );
      setCurrentDialogueObj(incorrectScene);
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
        switchToInquiryMode: true,
      });
    } else if (currentDialogueID === 'Come Back Later Act 4') {
      setCurrentDialogueObj(
        dialogueList.find(
          (dialogue) =>
            dialogue._id === dialogueIDConstants.ACT4_FAILED_DIALOGUE
        )
      );
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
    params.id,
  ]);

  return currentDialogueObj;
};

export default useCurrentDialogueObj;
