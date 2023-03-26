import { combineReducers } from 'redux'
import dataReducer from './reducer'
import dataReducer1 from './reducer'
const rootReducer = combineReducers({
  data: dataReducer,
  
  // add other reducers as needed
})

export default rootReducer
