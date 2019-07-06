// REDUX REDUCERS
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { storeGameData, storeSocket, storePlayersData, storeQuestions } from './storageReducers';

export default combineReducers({
  user: userReducer,
  socket: storeSocket,
  game: storeGameData,
  players: storePlayersData,
  questions: storeQuestions
});