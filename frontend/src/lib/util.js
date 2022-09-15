import { deadEndDialoguesObject } from './constants';

export const isDeadEndDialogue = (id) => deadEndDialoguesObject[id];

export const canPassAct4GameTime = (branchesVisited) => {
  const wellFirst3right = '2bb52d92-fe06-44f2-9ef4-bd9f24e3718c';
  const wellFirst3wrong = 'd6c414b2-7f61-4985-9c8a-b47346834980';
  const iWentOut4sm2nd = '66ce0907-8480-4a34-8b46-b223646d04d4';
  const iWentOut4dump2nd = '432e7f61-ec42-4d42-b454-7c76fe61201f';
  const thatWasTheOnly = '3784dfde-3000-4e5e-9efa-b9115def5725';

  let res = true;

  if (!(branchesVisited[wellFirst3right] || branchesVisited[wellFirst3wrong])) {
    res = false;
  }

  if (!(branchesVisited[iWentOut4sm2nd] || branchesVisited[iWentOut4dump2nd])) {
    res = false;
  }

  if (!branchesVisited[thatWasTheOnly]) {
    res = false;
  }

  return res;
};

export const recordInteraction = (type) => {
  const data = { type };

  fetch('https://acnm-api.vercel.app/api/record', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

export const wait = (amount = 0) =>
  new Promise((resolve) => setTimeout(resolve, amount));
