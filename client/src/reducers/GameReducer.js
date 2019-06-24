export default (state = null, { type, payload }) => {
  switch (type) {
    case 'STORE_GAME_NAME':
      return payload;

    default:
      return null;
  }
}