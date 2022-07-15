import { SNotesNeededToCompleteAct3, exampleCompleteSNotes } from './constants';

export const hasRequiredSNotesForFinalTrial = (SNotes = []) => {
  const requiredSNotes = { ...SNotesNeededToCompleteAct3 };

  for (const key in requiredSNotes) {
    requiredSNotes[key] = false;
  }

  SNotes.forEach((snote) => {
    if (snote.completed && snote.name in requiredSNotes) {
      requiredSNotes[snote.name] = true;
    }
  });

  for (const key in requiredSNotes) {
    if (!requiredSNotes[key]) {
      return false;
    }
  }
  return true;
};
