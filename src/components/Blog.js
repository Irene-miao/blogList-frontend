import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog  } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { initComments } from '../reducers/commentReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  useEffect(() => {
    dispatch(initComments(id))
    const interval=setInterval(() => {
      dispatch(initComments(id))
    }, 10000)

    return () => clearInterval(interval)

  }, [dispatch, id])
  const blogsSort = blogs.sort((a,b) => b.likes - a.likes)
  const blog = blogsSort.find(b => b.data?.id === id)
  if (!blog) {
    return null
  }

  const addLikes = (event) => {
    event.preventDefault()
    if (blog.data?.user[0]?.username !== user.username) {
      dispatch(notify('Only the blog creator can add like'))
    }
    try {
      const blogToChange = {
        id: blog.data?.id,
        user: blog.data?.user,
        title: blog.data?.title,
        author: blog.data?.author,
        url: blog.data?.url,
        likes: blog.data?.likes + 1,
      }
      dispatch(updateBlog(blogToChange))
      dispatch(notify( `Updated the blog ${blog.data?.title} by ${blog.data?.author} added`, 5))
    } catch (error) {
      dispatch(notify(`${error} `, 'error', 5))
    }
  }



  return (
    <div>
      <h2>
        {blog.data?.title} {blog.data?.author}
      </h2>
      <p><a href={`${blog.data?.url}`}>{blog.data?.url}</a></p>
      <p className='likes'>
        {blog.data?.likes} <Button variant='outline-info' size='sm' id='like' onClick={addLikes}>like</Button>
      </p>
      <p>added by {blog.data?.user[0]?.username}</p>
    </div>
  )
}

export default Blog