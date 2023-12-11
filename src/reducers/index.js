// reducers/index.js
import { combineReducers } from 'redux';
import conversationReducer from './conversationReducer';

const rootReducer = combineReducers({
    conversation: conversationReducer,
    // Add more reducers if needed
});

export default rootReducer;
