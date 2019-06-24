export const storeGameName = (state = null, { type, payload }) => {
  switch (type) {
    case 'STORE_GAME_NAME':
      return payload;

    default:
      return state;
  }
}

export const storeSocket = (state = null, { type, payload }) => {
  switch (type) {
    case 'STORE_SOCKET':
      return payload;

    default:
      return state;
  }
}

export const storeOpponent = (state = null, { type, payload }) => {
  switch (type) {
    case 'STORE_OPPONENT_DATA':
      return payload;

    default:
      return state;
  }
}