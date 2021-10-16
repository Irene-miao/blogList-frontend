import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import userService from '../utils/storage'
import loginService from '../services/login'
import { notify } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import  useField  from '../hooks/useField'


const LoginForm = () => {
  const username = useField('username')
  const password = useField('password')
  const dispatch = useDispatch()


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(username.value, password.value)
    try {
      const user = await loginService.login(username.value, password.value)
      await userService.saveUser(user)
      dispatch(setUser(user))
      console.log(user)
      dispatch(notify(`${user.name} successfully logged in`, 5))
    } catch (error) {
      dispatch(notify(`${error.response.data.error}`, 'error', 5))
    }
  }





  return (
    <div>
      <h3>Log in to application</h3>

      <form onSubmit={handleLogin}>
        <div>
          <div>username
            <input
              id='username'
              type='username'
              {...username} />
          </div>
          <div>
          password
            <input
              id='password'
              type="password"
              {...password}
            />
          </div>
        </div>
        <Button size='sm' id='login-button' type="submit">Submit</Button>
      </form>
    </div>
  )
}

export default LoginForm