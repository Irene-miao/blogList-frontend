import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


const User = () => {
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  if (!blogs && !id) {
    return null
  }
  console.log(id)
  const userBlogs = blogs.filter(blog => blog.data?.user[0]?.id === id)
  console.log(userBlogs)
  const name = userBlogs.map((blog) => blog.data?.user[0])
  console.log(name)


  return (
    <div>
      <h2>{name[0].username}</h2>
      <br></br>
      <h5>added blogs</h5>
      <ul>
        {userBlogs.map((blog) =>
          <li key={blog.data?.id}>{blog.data?.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User
