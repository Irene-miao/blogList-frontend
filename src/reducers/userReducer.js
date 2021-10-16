const userReducer = (state = null, action) => {
  console.log('STATE NOW:', state)
  console.log('ACTION:', action)
  switch(action.type) {
  case 'NEW_USER':
    return action.data
  default:
    return state
  }
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_USER',
      data: user,
    })
  }
}

export default userReducer