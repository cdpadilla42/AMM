import sanityClient from '../client';

export const getInventoryItems = async () => {
  const res = await sanityClient.fetch(
    `*[_type == "item"]{
      name, description, restrictUserAddingToInventory, descriptionA, descriptionB, descriptionC, descriptionD,
      "imageUrl": image.asset->url
    }`
  );
  return res;
};

export const getMapLocations = async () =>
  await sanityClient.fetch(
    `*[_type == "mapLocation"]{
      name, descriptionA, descriptionC, descriptionD,
      "imageUrl": image.asset->url
    }`
  );

export const getAnimalNotes = async () =>
  await sanityClient.fetch(
    `*[_type == "animalNotes"]{
      name, descriptionA, descriptionB, descriptionC, descriptionD, nickname,
      "animalRef": animalRef->{color},
      "imageUrl": image.asset->url
}`
  );

export const getSNotes = async () =>
  await sanityClient.fetch(
    `*[_type == "snotes"]{
      name, description, count, hidden, achievement, successMessage, itemEventTriggered, itemEventType, itemEventRef->{name},
}`
  );

export const getPrereqs = async () =>
  await sanityClient.fetch(
    `*[_type == "prereq"]{
      name, description
}`
  );

export const getSprites = async () =>
  await sanityClient.fetch(
    `*[_type == 'animalImage']{
      name,
      "images": images[]{
        emotion->{emotion},
        "spriteUrl": sprite.asset->url
      }
    }`
  );

export const getPictures = async () =>
  await sanityClient.fetch(
    `*[_type == 'pic']{
      name,
      "url":pic.asset->url,

    }`
  );

export const getDialogue = async (conversationID) =>
  await sanityClient.fetch(
    `*[_type == "dialogue" && conversation._ref == "${conversationID}"]{
      name, responseOptions, needEvidence, multiBranchEvidence, useLastAvailableEvidenceList, inventoryPrompt, followingDialogueFromEvidence->{_id}, _id, isFinalDialogue, switchToInquiryMode, requiredEvidence->{name}, loseHealthOnIncorrect,
      animals[]->{name},
      "phrase": phrase[]{
        emotion->{emotion}, speaker->{name, color}, text, isGrey,
        link, sNotesEventRef->{name, count, successMessage, hidden, achievement, itemEventTriggered, itemEventType, itemEventRef->{name, _id}}, sNotesEventTriggered, sNotesEventType, 
        changePosition, leftAnimal->{name}, rightAnimal->{name}, leftOrientation, rightOrientation, leftAnimalCentered, centeredOrientation, leftEmotion->{emotion}, rightEmotion->{emotion},
        showImage,
        itemEventTriggered, itemEventType, itemEventRef->{name}, prereqEventTriggered, prereqEventRef->{name},
        objectionDialogue->{_id},
        "imageUrl": image.asset->url
      },
      "responseOptions": responseOptions[]{
        text, 
        followingDialogue->{_id}
      },
      "requiredEvidence": requiredEvidence[]->{name, _type},
      "evidenceWithPaths": evidenceWithPaths[]{followingDialogueFromEvidence->{_id}, possibleEvidence->{name}},
    }`
  );

export const getInquiryDialogues = async (conversationID) =>
  await sanityClient.fetch(
    `*[_type == "inquiry" && conversation._ref == "${conversationID}"]{
      name, defaultResponse, 
      prereqRef->{name},
      "presentedEvidence": presentedEvidence[]->{name, _type},
      "phrase": phrase[]{
        emotion->{emotion}, speaker->{name, color}, text, isGrey, prereq->{name},
        link, sNotesEventRef->{name, count, successMessage, hidden, achievement, itemEventTriggered, itemEventType, itemEventRef->{name, _id}}, sNotesEventTriggered, sNotesEventType, 
        changePosition, leftAnimal->{name}, rightAnimal->{name}, leftOrientation, rightOrientation, leftAnimalCentered, centeredOrientation, leftEmotion->{emotion}, rightEmotion->{emotion},
        showImage, prereqEventTriggered, prereqEventRef->{name},
        itemEventTriggered, itemEventType, itemEventRef->{name, _id},
        "imageUrl": image.asset->url
      },
    }`
  );

export const getConversationBackground = async (conversationID) =>
  await sanityClient.fetch(
    `*[_type == "conversation" && conversation._id == "${conversationID}"]{
      "backgroundURL": background->{
        image{
          asset->{url}
        },
        desktop{
          asset->{url}
        },
        tablet{
          asset->{url}
        },
        phone{
          asset->{url}
        },
      }
    }`
  );

export const getConversationDetails = async (conversationID) =>
  await sanityClient.fetch(
    `*[_type == "conversation" && conversation._id == "${conversationID}"]{
      act, _id,
    }`
  );

export const getConversations = async (conversationID) =>
  await sanityClient.fetch(
    `*[_type == "conversation"]{
      name, _id, act, catchphrase,
    }`
  );
