import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Users = () => {
  const blogs = useSelector(state => state.blogs)
  console.log(blogs)
  const users = blogs.map((blog) => blog.data?.user[0])
  console.log(users)
  if (!blogs && !users) {
    return null
  }
  const uniqueUsers = users.filter((v, i , a) => a.findIndex(t => (t.id === v.id)) === i)
  console.log(uniqueUsers)
  const returnLength = (name, object) => {
    const blogs = object.filter((item) => item.data?.user[0]?.username === name)
    return blogs.length
  }
  return (
    <div>
      <h2>Users</h2>
      <Table size="sm">
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {uniqueUsers.map((user) =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{returnLength(user.username, blogs)}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
