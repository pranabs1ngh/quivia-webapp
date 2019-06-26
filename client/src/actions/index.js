// REDUX ACTION CREATORS
import axios from 'axios'

export const fetchUser = () => async dispatch => {
  const response = await axios.get('/api/user');

  dispatch({ type: 'FETCH_USER', payload: response.data });
};

export const storeGameData = data => ({ type: 'STORE_GAME_NAME', payload: data });

export const storePlayersData = data => ({ type: 'STORE_PLAYERS_DATA', payload: data });

export const storeDisplayData = data => ({ type: 'STORE_DISPLAY_DATA', payload: data });