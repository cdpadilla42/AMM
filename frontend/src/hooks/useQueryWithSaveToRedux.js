import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function useQueryWithSaveToRedux(name, query, reduxAction) {
  const dispatch = useDispatch();

  const handleSanityFetchEffect = (data, error, loading, reduxAction) => {
    if (error) {
      throw new Error('Woops! Did not receive data from inventory', {
        data,
        error,
        loading,
        reduxAction,
      });
    }

    if (!loading && !data) {
      // handle missing data
      toast(
        "🚨 Hey! Something didn't load right. You might want to refresh the page!"
      );
    }

    if (data) {
      dispatch(reduxAction(data));
    }
  };
  const { data, isLoading, error } = useQuery(name, query);

  useEffect(() => {
    handleSanityFetchEffect(data, error, isLoading, reduxAction);
  }, [data, isLoading, error]);

  return { data, isLoading, error };
}
