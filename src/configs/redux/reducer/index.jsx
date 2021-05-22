import { combineReducers } from 'redux'
import  movieReducer  from './movie'
import userReducer from './user'
import locationReducer from './location'
import historyReducer from './history'

const rootReducer = combineReducers({
    movieReducer,
    userReducer,
    locationReducer,
    historyReducer
})

export default rootReducer