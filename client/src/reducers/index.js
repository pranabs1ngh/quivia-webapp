// REDUX REDUCERS
import { combineReducers } from 'redux';
import { storeUserData, storeGameData, storePlayersData, storeQuestions } from './storageReducers';

export default combineReducers({
  user: storeUserData,
  game: storeGameData,
  players: storePlayersData,
  questions: storeQuestions
});