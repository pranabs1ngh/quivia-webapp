// REDUX ACTION CREATORS
import axios from 'axios'

export const fetchUser = () => async dispatch => {
  const response = await axios.get('/api/user');

  dispatch({ type: 'FETCH_USER', payload: response.data });
};

export const storeSocket = socket => ({ type: 'STORE_SOCKET', payload: socket });

export const storeGameName = data => ({ type: 'STORE_GAME_NAME', payload: data });

export const storePlayers = data => ({ type: 'STORE_PLAYERS_DATA', payload: data });