const initialState = {
  user: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_USER':
      return payload

    default:
      return state
  }
}
