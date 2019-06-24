// REDUX REDUCERS
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import gameReducer from './GameReducer';

export default combineReducers({
  user: userReducer,
  game: gameReducer
});