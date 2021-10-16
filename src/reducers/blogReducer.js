import blogService from '../services/blogs'

const Object = (blog) => {
  return {
    type: 'INIT_BLOGS',
    data: {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: blog.user,
    }
  }
}

const blogReducer = (state = [], action) => {
  console.log('ACTION:', action)
  console.log('STATE NOW:', state)
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action]
  case 'INIT_BLOGS':
  {
    const blogs =  action.data
    const newBlogs = blogs.map(Object)
    return newBlogs
  }
  case 'UPDATE_BLOG':
  {
    const id = action.data
    const blog = state.find((blog) => blog.data?.id === id)
    const changedBlog = {
      ...blog,  data:{
        id: blog.data?.id,
        likes: blog.data?.likes + 1,
        title: blog.data?.title,
        author: blog.data?.author,
        url: blog.data?.author,
        user: blog.data?.user
      }
    }
    return state.map((blog) => blog.data?.id === id ? changedBlog : blog)
  }
  case 'REMOVE_BLOG':
  {
    const id = action.data
    return state.filter((blog) => blog.data?.id !== id)
  }
  default:
    return state
  }
}

export const create = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data:  blogs ,
    })
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    await blogService.update(blog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: blog.id,
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id,
    })
  }
}


export default blogReducer