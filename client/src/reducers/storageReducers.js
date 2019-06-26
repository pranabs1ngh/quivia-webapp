export const storeGameData = (state = null, { type, payload }) => {
  switch (type) {
    case 'STORE_GAME_NAME':
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

export const storeDisplayData = (state = null, { type, payload }) => {
  switch (type) {
    case 'STORE_DISPLAY_DATA':
      return payload;

    default:
      return state;
  }
}