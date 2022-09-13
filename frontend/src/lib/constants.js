export const gameStartDialogueID = '729d0b36-6021-4843-8e09-da92c651022f';
export const lastActTwoDialogueID = '1bb0bef9-dee9-415f-beaa-8570240b8d27';
export const dreamAddress = 'DA-5197-5510-7359';

export const itemsInInventoryAllButTheProphecy = {
  items: [
    'Pitfall Seed',
    'Skeleton',
    'Nutcracker',
    'Microwave* Change it pink?',
    'Stick',
    'Apron',
    'Orange Cosmos',
    'Moon',
    "Julian's Riddle",
    "Julian's Bonus Riddle",
    'Lucky’s Get Well Card',
    'Coffee Cup',
    'Paint Set',
    'Lucky Cat',
    'Drawing of Thomas',
    'Mystery Item',
    'Thomas',
    'Drawing of Lucky',
    'Paw Report',
    'Apple',
    'Plushie',
    'Star Fragment',
    'Brick Oven',
    'Handmade Crown',
    'Mini Fridge',
    'Sewing Box',
    'Camera Shirt',
    'Mama Bear',
    'Sewing Machine',
    'Coin',
    'Cake',
  ],
  act: 1,
  sNotes: [
    {
      name: 'testNote',
      completed: true,
    },
    {
      name: 'testNoteMultiple',
      completed: false,
      totalCount: 2,
      userEventInstances: ['???:1'],
    },
  ],
  lastConversationID: '664db36f-6324-4828-a8ad-35c78f5180f1',
};

export const act3Scenes = {
  '65c247c3-947b-4444-bf08-b7aed9c4c89b': {
    name: 'Julian',
    sceneOrder: [
      {
        name: 'Start',
        dialogueID: 'd24e6cef-f067-4330-9cdf-bf780af06446',
      },
      {
        name: 'Comeback',
        dialogueID: '2f872edd-eeb9-42c2-9bd4-b18d364ab16e',
      },
      {
        name: 'Freemode',
        dialogueID: '14372109-7123-474b-af7b-c642d61f5f1a',
        haltMovingSceneForwardAtEndOfDialogue: true,
      },
    ],
  },
  '52451f96-2c42-43bd-ac65-b351d7198d6c': {
    name: 'Sterling',
    sceneOrder: [
      {
        name: 'Freemode',
        dialogueID: '903a056e-0838-4034-b5bd-099144ab773e',
        haltMovingSceneForwardAtEndOfDialogue: true,
      },
    ],
  },
  '339510d1-abf9-44ce-8426-d34f623eef2f': {
    name: 'Lucky',
    sceneOrder: [
      {
        name: 'Start',
        dialogueID: 'c416e426-c35d-4027-9b5b-872f50ca3267',
      },
      {
        name: 'Freemode',
        dialogueID: '152c62ca-3401-4ff0-a80a-e32cefb4a5c9',
        haltMovingSceneForwardAtEndOfDialogue: true,
      },
      {
        name: 'LuckyNeedsSpace',
        dialogueID: '038a3775-c3f8-412e-b56b-47f973e46453',
      },
      {
        name: 'Freemode',
        dialogueID: '152c62ca-3401-4ff0-a80a-e32cefb4a5c9',
        haltMovingSceneForwardAtEndOfDialogue: true,
      },
    ],
  },
  '4d010f4f-21db-4f11-b427-d4d99e55df0c': {
    name: 'Katt',
    sceneOrder: [
      {
        name: 'Start',
        dialogueID: '56f90b3a-993b-4982-af3e-dc83f582493d',
      },
      {
        name: 'Freemode',
        dialogueID: '76508ca2-2cdd-4d7e-a334-f6ba21f8646e',
        haltMovingSceneForwardAtEndOfDialogue: true,
      },
    ],
  },
  '656278f2-8610-4a94-93e8-c75acafce071': {
    name: 'Bag Check',
    sceneOrder: [
      {
        name: 'Start',
        dialogueID: 'b557814b-e4b2-4356-942a-7be806457ec8',
        haltMovingSceneForwardAtEndOfDialogue: true,
      },
    ],
  },
  'e1688c5f-218a-4656-ad96-df9a1c33b8f8': {
    name: 'Chadder',
    sceneOrder: [
      {
        name: 'Start',
        dialogueID: '8f8508d9-7517-4767-b731-a6f42427d436',
      },
      {
        name: 'Freemode',
        dialogueID: '71c1dd0d-cbd2-47d6-972d-0775d6c15e44',
        haltMovingSceneForwardAtEndOfDialogue: true,
      },
    ],
  },
  'd44a5dac-b32a-46b9-b86e-45e84e4dd106': {
    name: 'Elvis',
    sceneOrder: [
      {
        name: 'Start',
        dialogueID: '40f2841b-1a74-48d8-a569-ea4e684fe8cc',
      },
      {
        name: 'Before Warmup',
        dialogueID: '2fdb72e1-2448-4f6e-b3bd-bd158108c682',
      },
      // {
      //   name: 'Before Warmup Incorrect',
      //   dialogueID: 'd5e6e234-a8b9-4dfd-87fe-7fa8f00467ab',
      // },
      {
        name: 'Freemode',
        dialogueID: 'e3bd7c19-386a-4c47-8b51-8f586b978ab4',
        haltMovingSceneForwardAtEndOfDialogue: true,
      },
    ],
  },
  '32bbe59e-42d3-4295-8c23-f6018ed28bb1': {
    name: 'Sterling',
    sceneOrder: [
      {
        name: 'Start',
        dialogueID: '51079547-4ead-4bab-ab69-f373d5a5da01',
      },
      {
        name: 'After Elvis',
        dialogueID: '1abf4596-9c2a-4d3c-ae88-23ea2e9a291d',
      },
      {
        name: 'Before Cake',
        dialogueID: '027da17b-68aa-4ff9-80b6-f7e55ded9f1b',
        // haltMovingSceneForwardAtEndOfDialogue: true,
      },
      {
        name: 'Freemode',
        dialogueID: '07c0f587-36df-4481-a992-173c6f0389d0',
        haltMovingSceneForwardAtEndOfDialogue: true,
      },
    ],
  },
  '664db36f-6324-4828-a8ad-35c78f5180f1': {
    name: 'Ankha',
    sceneOrder: [
      {
        name: 'Start',
        dialogueID: '6e1faf85-06a0-452c-953a-0e4a3988dd66',
      },
      {
        name: 'Freemode',
        dialogueID: '25766a9f-440f-4464-9f79-bfb49ad684fc',
        haltMovingSceneForwardAtEndOfDialogue: true,
      },
    ],
  },
  'b4f841cb-0b75-4d6e-b76f-e2bc3fddbaf5': {
    name: 'Nenn',
    sceneOrder: [
      {
        name: 'Start',
        dialogueID: 'fabdef5e-fd4a-489b-92f0-375195b5e6ba',
      },
      {
        name: 'Freemode',
        dialogueID: 'c3d6e35a-1838-4986-829a-ab57926e3c8f',
        haltMovingSceneForwardAtEndOfDialogue: true,
      },
    ],
  },
  '4ff83976-69df-4123-86a8-e764f671d0f7': {
    name: 'Stitches',
    sceneOrder: [
      {
        name: 'Start',
        dialogueID: 'd02f7cb4-7550-477c-bc14-0df30fcc48ce',
      },
      {
        name: 'Pre-Photos',
        dialogueID: 'e0eef3ca-a54f-4d23-9d45-8a308beaba6b',
        haltMovingSceneForwardAtEndOfDialogue: true,
      },
      {
        name: 'Photos',
        dialogueID: '5a208552-f524-46c7-aefc-8eaabc09c9c8',
      },
      {
        name: 'Freemode',
        dialogueID: '42917e6c-f37d-46c9-895f-d1320f214ace',
        haltMovingSceneForwardAtEndOfDialogue: true,
      },
    ],
  },
  '27f4be58-38f3-4321-bbc9-c76e0c675c36': {
    name: 'Merengue',
    sceneOrder: [
      {
        name: 'Start',
        dialogueID: 'f819341d-5552-418d-89d4-ebbe55bc2abd',
      },
      {
        name: 'Post Cake',
        dialogueID: '28aa1fe4-94bd-441f-a870-3bb8b50b73ba',
      },
      {
        name: 'Freemode',
        dialogueID: '9dbae51b-6d40-4796-83ef-8a9ec1315d29',
        haltMovingSceneForwardAtEndOfDialogue: true,
      },
    ],
  },
};

export const conversationIDConstants = {
  ACT2_TRIAL_2: 'cea264b4-3530-4521-8fc2-f6c0e92b1745',
  ACT4_TRIAL_GAMETIME: 'e5b470ca-5b8e-4f2e-a6b0-8743cfcb0c59',
};

export const dialogueIDConstants = {
  ACT4_FAILED_DIALOGUE: 'f82b48f2-fbe2-415c-8349-40a7b39cf8b4',
  LAST_CRIMESCENE_DIALOGUE: 'f09eead4-1928-4267-a6ce-f6ac72441e79',
};

export const specialDialoguesObject = {
  'ELVIS3 BEFORE WARMUP 2 wrong sixth time':
    'bc05a0be-4dc1-439e-9d29-2b729e0644f8',
  'ELVIS3 BEFORE WARMUP 2 wrong third time':
    '5f6f4987-dc99-4850-8984-ea1c665835e3',
  'ACT2 JULIAN TRIAL TAUNT': 'bb659b86-fb10-47e9-8b94-3f693ed53196',
};

export const deadEndDialoguesObject = {
  'b7412543-540f-4f11-a1ec-9e3109f8b6ff': true, // MERENGUE3 post cake 2 no
  '387c03d0-4c59-4fa5-8ddd-32cdc85f1e77': true, // JUL3 COMEBACK2 not yet
};

export const multiSelectDialogueIDs = {
  '41870214-5b4d-4e09-b08a-d7c78f2652a4': true, // Merengue ACT3 initial question
  'e64bbed3-2a4f-49f1-bfa3-ad99db263aa7': true, // Merengue ACT3 incorrect
};

export const correctResponseToMultiSelect = {
  '41870214-5b4d-4e09-b08a-d7c78f2652a4':
    'de4053e3-a6e2-437e-95ef-6e429e0188cb', // Merengue ACT3
  'e64bbed3-2a4f-49f1-bfa3-ad99db263aa7':
    'de4053e3-a6e2-437e-95ef-6e429e0188cb', // Merengue ACT3 incorrect
};

export const incorrectResponseToMultiSelect = {
  '41870214-5b4d-4e09-b08a-d7c78f2652a4':
    'e64bbed3-2a4f-49f1-bfa3-ad99db263aa7', // Merengue ACT3
  'e64bbed3-2a4f-49f1-bfa3-ad99db263aa7':
    'e64bbed3-2a4f-49f1-bfa3-ad99db263aa7', // Merengue ACT3 incorrect
};

export const initiallyLockedConversations = {
  '32bbe59e-42d3-4295-8c23-f6018ed28bb1': true, // ACT3 Sterling,
  'd44a5dac-b32a-46b9-b86e-45e84e4dd106': true, // ACT3 Elvis,
  'e1688c5f-218a-4656-ad96-df9a1c33b8f8': true, // ACT3 Chadder,
  'b4f841cb-0b75-4d6e-b76f-e2bc3fddbaf5': true, // ACT3 Nenn,
  '65c247c3-947b-4444-bf08-b7aed9c4c89b': true, // ACT3 Julian,
};

export const dialoguesThatUnlockConversations = {
  '339cbdb8-230b-4453-a218-28015b32bc5c':
    '32bbe59e-42d3-4295-8c23-f6018ed28bb1', // MERENGUE3 initial convo 2  => Sterling
  '51079547-4ead-4bab-ab69-f373d5a5da01':
    'd44a5dac-b32a-46b9-b86e-45e84e4dd106', // STERLING3 Start => Elvis
  'de4053e3-a6e2-437e-95ef-6e429e0188cb':
    'e1688c5f-218a-4656-ad96-df9a1c33b8f8', // MERENGUE3 post cake 3 correct items => Chadder
  'd02f7cb4-7550-477c-bc14-0df30fcc48ce':
    'b4f841cb-0b75-4d6e-b76f-e2bc3fddbaf5', // STITCHES3 Start => Nenn
  'LUCKY cake FB': '65c247c3-947b-4444-bf08-b7aed9c4c89b', // LUCKY Cake FB (inquiry name) => Julian
};

// Key is conversationID. Value is returning DialogueID
export const trialTestimonyConversationIDs = {
  [conversationIDConstants.ACT2_TRIAL_2]:
    '966777cd-6fe8-4306-94b6-6cbdff81039e', // ACT2 Julian
  [conversationIDConstants.ACT4_TRIAL_GAMETIME]:
    '9469c498-90ef-4a9a-bc33-15c68c34e48f', // ACT4 GAME TIME
};

// Key is starting conversationID. Value is leading to conversationID
export const connectedConversations = {
  // ACT 2
  // ================
  // act2 Trial 1 => 2
  'd2c9e39a-269d-4e45-9762-43156e860643': conversationIDConstants.ACT2_TRIAL_2,
  // act2 Trial 2 => 3
  [conversationIDConstants.ACT2_TRIAL_2]:
    '0dbabd60-007b-45a6-83bb-f7616d341a15',
  // act2 Trial 3 => Crime Scene
  '0dbabd60-007b-45a6-83bb-f7616d341a15':
    '1bb0bef9-dee9-415f-beaa-8570240b8d27',
  // ACT 4
  // ================
  // ACT4 1Trial Time! → ACT4 2Game Time!
  '10a0bd5d-70a1-422a-a02e-11e1078f7000':
    'e5b470ca-5b8e-4f2e-a6b0-8743cfcb0c59',
  // ACT4 2Game Time! => ACT4 3POST
  'e5b470ca-5b8e-4f2e-a6b0-8743cfcb0c59':
    '1aad77e1-bbbf-4fad-bf79-fae82ebbdd0e',
  // ACT4 3POST => credits slideshow
  '1aad77e1-bbbf-4fad-bf79-fae82ebbdd0e': 'credits',
  // EPILOGUE => play screen
  '56cc2315-f580-4116-bf9d-be350ea15e10': 'play',
};

export const requiredDialoguesInJulianTrial2 = {
  '39448cc8-dfd4-484f-9037-fbaf3c7c8d4d': 'dark and stormy',
  'cae65585-487b-438f-92b3-8e99092f4a55': 'and before he could say anything',
};

export const requiredDialoguesInStitchesTrial4 = {
  '2bb52d92-fe06-44f2-9ef4-bd9f24e3718c': 'ACT4GAME 1well first 3 right',
  'd6c414b2-7f61-4985-9c8a-b47346834980': 'ACT4GAME 1well first 3 wrong',
  '66ce0907-8480-4a34-8b46-b223646d04d4': 'iWentOut4sm2nd',
  '432e7f61-ec42-4d42-b454-7c76fe61201f': 'iWentOut4dump2nd',
  '3784dfde-3000-4e5e-9efa-b9115def5725': 'thatWasTheOnly',
};

export const requiredConversationsVisitedBeforeTrial2 = {
  '09b9f6f2-59f8-4858-a38d-4503977dbb89': true,
  '10350fa4-4c5a-4128-962e-008511bd9bc3': true,
  '2e8e6a1d-6267-4e58-8ef2-2d50edab7d28': true,
  '7aa1ca81-9a27-4d5c-a75b-3624ca6522be': true,
  '98b647a0-bb03-4e5c-b34f-bbdecaa6445d': true,
  'a81fb6a7-d450-45e8-a942-e5c82fb1a812': true,
  'b3e19861-c61c-43ec-b48d-51ae7eacbd14': true,
  'd008519f-16c0-4ef0-b790-f5eb0cb3b0b4': true,
  'dc7bef1f-856e-4b3d-bd79-159d321aa813': true,
  'e6443c66-4692-4033-926f-eebdf5100efb': true,
};

export const alwaysShowHealthBarConversations = {
  'e5b470ca-5b8e-4f2e-a6b0-8743cfcb0c59': true,
};

export const specialSceneHandling = {
  // if this scene object appears, move the scene forward
  'ooommm LUCKY thomas': {
    name: 'LuckyNeedsSpace',
    dialogueID: '038a3775-c3f8-412e-b56b-47f973e46453',
  },
};

export const SNotesNeededToCompleteAct3 = {
  'Updated Testimonies': '0ca7672b-9f80-46f3-899e-dfda5c582c8a',
  "Lucky's Memories": '23ea8b5c-3ad0-4e44-bbbf-dfe9e1ba36b9',
  Footprints: '661da4e4-65fa-40f6-be3f-7563f190c83a',
  'Distraught Stitches': '5080e051-fc9b-4306-8587-a6cb15672a1d',
  'Mystery Item': '79b9a2d0-0012-4d04-89dc-b544863d6f5a',
  "Lucky's Package": 'aac262af-4088-4532-88ed-2e10878c872b',
  'Print Photos': '8d0500b4-8209-4cfe-b1e9-a2a91c3616d4',
};

export const exampleCompleteSNotes = [
  { name: 'Updated Testimonies', completed: true },
  { name: "Lucky's Memories", completed: true },
  { name: 'Footprints', completed: true },
  { name: 'Distraught Stitches', completed: true },
  { name: 'Mystery Item', completed: true },
  { name: "Lucky's Package", completed: true },
  { name: 'Print Photos', completed: true },
];
