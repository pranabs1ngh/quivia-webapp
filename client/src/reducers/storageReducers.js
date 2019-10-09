export const storeUserData = (state = { user: null }, { type, payload }) => {
  switch (type) {
    case 'FETCH_USER':
      return payload

    default:
      return state
  }
}

export const storeGameData = (state = null, { type, payload }) => {
  switch (type) {
    case 'STORE_GAME_DATA':
      return payload;

    case 'SET_SOCKET_ROOM_ID':
      return { ...state, socketRoomID: payload };

    case 'UPDATE_ROUND':
      return { ...state, round: payload };

    default:
      return state;
  }
}

export const storePlayersData = (state = null, { type, payload }) => {
  switch (type) {
    case 'STORE_PLAYERS_DATA':
      return payload;

    default:
      return state;
  }
}

export const storeQuestions = (state = null, { type, payload }) => {
  switch (type) {
    case 'STORE_QUESTIONS':
      return payload;

    default:
      return state;
  }
}