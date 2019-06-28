export const storeGameData = (state = null, { type, payload }) => {
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

export const storePlayersData = (state = null, { type, payload }) => {
  switch (type) {
    case 'STORE_PLAYERS_DATA':
      return payload;

    default:
      return state;
  }
}

export const storeWhichPlayer = (state = null, { type, payload }) => {
  switch (type) {
    case 'STORE_WHICH_PLAYER':
      return payload;

    default:
      return state;
  }
}