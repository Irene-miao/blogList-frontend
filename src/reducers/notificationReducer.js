const notificationReducer = (state = null, action) => {
  console.log('STATE NOW:', state)
  console.log('ACTION:', action)
  switch (action.type) {
  case 'NEW_MESSAGE':
    return action.data
  case 'REMOVE_MESSAGE':
    return null
  default:
    return state
  }
}
let timeoutId

export const notify = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'NEW_MESSAGE',
      data: {
        message
      }
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'REMOVE_MESSAGE'
      })
    }, time * 1000)
  }
}

export const stopNotify = (id) => (
  { type: 'REMOVE_MESSAGE' }
)

export default notificationReducer
