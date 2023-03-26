import axios from 'axios';

// Define action types
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';



// Define action creators
export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: filter
  };
};


export const fetchDataRequest = () => {
  return {
    type: FETCH_DATA_REQUEST
  };
};

export const fetchDataSuccess = (data) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data
  };
};

export const fetchDataFailure = (error) => {
  return {
    type: FETCH_DATA_FAILURE,
    payload: error
  };
};


// Define asynchronous action creator
export const fetchData = (page = 0) => {
  return (dispatch) => {
    let skipOffset = page*20;
    dispatch(fetchDataRequest());
    axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${skipOffset}`)
      .then((response)  => {
        const data = response.data;
        dispatch(fetchDataSuccess(data));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(fetchDataFailure(errorMessage));
      });
  };
};



