// REDUX REDUCERS
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { storeGameName, storeSocket, storeOpponent } from './storageReducers';

export default combineReducers({
  user: userReducer,
  opponent: storeOpponent,
  socket: storeSocket,
  game: storeGameName
});