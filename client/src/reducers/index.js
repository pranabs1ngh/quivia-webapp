// REDUX REDUCERS
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { storeGameName, storeSocket } from './storageReducers';

export default combineReducers({
  user: userReducer,
  socket: storeSocket,
  game: storeGameName
});