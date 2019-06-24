export const storeGameName = (state = null, { type, payload }) => {
  switch (type) {
    case 'STORE_GAME_NAME':
      return payload;

    default:
      return null;
  }
}

export const storeSocket = (state = null, { type, payload }) => {
  switch (type) {
    case 'STORE_SOCKET':
      return payload;

    default:
      return null;
  }
}