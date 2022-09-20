import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAnimalNotes, getMapLocations, getSNotes } from '../store/inventory';

const useDataFetch = () => {
  const dispatch = useDispatch();
  const animalNotes = useSelector((store) => store.inventory.notes);
  const mapLocations = useSelector((store) => store.inventory.mapLocations);
  const sNotes = useSelector((store) => store.inventory.sNotes);

  return function dataFetch() {
    if (!animalNotes) {
      dispatch(getAnimalNotes());
    }

    // dispatch(getPictures());
    //  dispatch(getSprites());
    //  dispatch(getInventoryItems());
    if (!mapLocations) {
      dispatch(getMapLocations());
    }
    if (!sNotes) {
      dispatch(getSNotes());
    }
  };
};

export default useDataFetch;
