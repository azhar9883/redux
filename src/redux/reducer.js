import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS ,FETCH_DATA_FAILURE } from "./action";





const initialState = {
    data: [],
    isLoading: false,
    error: null,
    filter: ''
  }

  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_FILTER':
        return {
          ...state,
          filter: action.payload
        };
      default:
        return state;
    }
  };
  
const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DATA_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null
        }
      case FETCH_DATA_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.payload
        }
      case FETCH_DATA_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        }
      default:
        return state
    }
  }
 

  export default dataReducer
  