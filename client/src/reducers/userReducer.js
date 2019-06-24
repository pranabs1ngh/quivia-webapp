export default (state = { user: null }, { type, payload }) => {
  switch (type) {
    case 'FETCH_USER':
      return payload

    default:
      return state
  }
}
