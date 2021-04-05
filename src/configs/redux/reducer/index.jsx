import { combineReducers } from 'redux'
import  movieReducer  from './movie'
import userReducer from './user'
import locationReducer from './location'

const rootReducer = combineReducers({
    movieReducer,
    userReducer,
    locationReducer
})

export default rootReducer