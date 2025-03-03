// REDUX ACTION CREATORS
import axios from 'axios'
import { apiUrl } from '../config/env'

export const fetchUser = () => async dispatch => {
  const response = await axios.get(`${apiUrl}/api/user`)

  dispatch({ type: 'FETCH_USER', payload: response.data })
}

export const storeGameData = data => ({ type: 'STORE_GAME_DATA', payload: data })

export const setSocketRoomID = data => ({ type: 'SET_SOCKET_ROOM_ID', payload: data })

export const updateRound = data => ({ type: 'UPDATE_ROUND', payload: data })

export const storePlayersData = data => ({ type: 'STORE_PLAYERS_DATA', payload: data })

export const storeQuestions = data => ({ type: 'STORE_QUESTIONS', payload: data })