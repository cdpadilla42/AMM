import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getConversations } from '../store/conversations';

const SelectConversation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversations());
  }, []);

  return (
    <div>
      <ul>
        <li>Hello!</li>
      </ul>
    </div>
  );
};

export default SelectConversation;
