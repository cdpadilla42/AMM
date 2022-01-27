import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const useCurrentSceneObj = () => {
  const params = useParams();
  const userAct3Scenes = useSelector((state) => state.act3Scenes);
  const conversationID = params?.id || '';
  const currentConversationUserScene = userAct3Scenes[conversationID]?.scene;
  return currentConversationUserScene || {};
};

export default useCurrentSceneObj;
