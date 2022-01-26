import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const useIsFreeMode = () => {
  const { id: conversationID } = useParams();
  const playersAct3Scenes = useSelector((state) => state.act3Scenes);
  const currentAct3SceneObject = playersAct3Scenes[conversationID];
  const { freeMode } = useSelector((state) => state.app);

  return currentAct3SceneObject?.name === 'Freemode' || freeMode;
};

export default useIsFreeMode;
