import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { create } from '../reducers/commentReducer'
import { Button } from 'react-bootstrap'

const Comment = () => {
  const dispatch = useDispatch()
  const blog = useSelector(state => state.comments)
  if (!blog) {
    return null
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const comment = event.target.content.value
    dispatch(create(blog, comment))
    dispatch(notify(`Created a new comment ${comment} for blog ${blog.data?.title}`, 5))
    event.target.content.value = ''
  }

  return (
    <div>
      <h5>Comments</h5>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input className='form' name='content' />
              <Button size='sm' type='submit'>add comments</Button>
            </div>
          </form>
        </div>
        <ul>
          {blog.data?.comments.map(comment =>
            <div key={comment.id}>
              <li>{comment.content}</li>
            </div>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Comment
