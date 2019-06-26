// REDUX REDUCERS
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { storeGameData, storePlayersData, storeDisplayData } from './storageReducers';

export default combineReducers({
  user: userReducer,
  players: storePlayersData,
  game: storeGameData,
  displaySequence: storeDisplayData
});