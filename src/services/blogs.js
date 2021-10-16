import axios from 'axios'
import userService from '../utils/storage'
const baseUrl = '/api/blogs'


const config = () => {
  return {
    headers: { Authorization: `bearer ${userService.loadUser().token}` }
  }
}

const blogService = {

  create: async (newObject) => {

    const response = await axios.post(baseUrl, newObject, config)
    return response.data

  },

  remove: async (id, newObject) => {

    const response = await axios.delete(`${baseUrl}/${id}`, config, newObject)
    return response.data
  },

  update: async (object) => {

    const newObject = { title: object.title, author: object.author, url: object.url, likes: object.likes }
    const response = await axios.put(`${baseUrl}/${object.id}`, config, newObject)
    return response.data
  },

  getOne: async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
  },

  getAll: async () => {
    const response = await axios.get(baseUrl)
    return response.data
  },

}

export default blogService
