// store.js
import { createStore } from 'redux';
import rootReducer from './reducers'; // Create the rootReducer combining all reducers

const store = createStore(rootReducer);

export default store;