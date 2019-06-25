// REDUX REDUCERS
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { storeGameName, storeSocket, storePlayers } from './storageReducers';

export default combineReducers({
  user: userReducer,
  players: storePlayers,
  socket: storeSocket,
  game: storeGameName
});