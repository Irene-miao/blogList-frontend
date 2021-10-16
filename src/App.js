import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import { initBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import User from './components/User'
import Blogs from './components/Blogs'
import { Navbar, Nav, Button } from 'react-bootstrap'
import Comment from './components/Comment'
import userService from './utils/storage'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)


  useEffect(() => {
    dispatch(initBlogs())
    const interval=setInterval(() => {
      dispatch(initBlogs())
    }, 10000)

    return () => clearInterval(interval)
  }, [dispatch])

  useEffect(() => {
    const blogUser = userService.loadUser()
    if (blogUser) {
      dispatch(setUser(blogUser))
    }
  }, [dispatch])


  const loginForm = () => (
    <Togglable buttonLabel="login to application">
      <LoginForm />
    </Togglable>
  )

  const removeUser = async () => {
    await userService.logoutUser()
    dispatch(setUser(null))
  }



  return (
    <div className="container">
      <Router>
        <Navbar collapseOnSelect expand={true} bg="dark" variant='dark'>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link  to="/blogs">blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link to="/users">users</Link>
              </Nav.Link>
              <Nav.Link  href="#" as="span">
                {user === null ? (
                  loginForm()
                ) : (
                  <div className='row'><p>{user.name} logged in</p><Button  variant='light' size='sm' id='logout' onClick={() => removeUser()}>logout</Button></div>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div>
          <Notification  />
        </div>


        <br></br>
        <Switch>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/blogs/:id">
            <Blog />
            <Comment />
          </Route>
          <Route path="/blogs">
            <Blogs />
          </Route>
        </Switch>
      </Router>
    </div>

  )
}

export default App