const storageKey = 'loggedBlogappUser'

const userService = {
  saveUser : ( user ) => {
    localStorage.setItem(storageKey, JSON.stringify(user))
  },

  loadUser : () => {
    JSON.parse(localStorage.getItem(storageKey))
  },

  logoutUser : () => {
    localStorage.removeItem(storageKey)
  }


}

export default userService