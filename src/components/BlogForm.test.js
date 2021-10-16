import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component
  beforeEach(() => {
    component = render(
      <BlogForm
        createBlog={mockHandleAdd}
      />
    )
  })

  const mockHandleAdd = jest.fn()

  test('form calls event handler receive right new blog details as props', () => {
    const inputTitle = component.container.querySelector('#title')
    const inputLikes = component.container.querySelector('#likes')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(inputTitle, {
      target: { value: 'Blog Title' },
    })
    fireEvent.change(inputLikes, {
      target: { value: '2' },
    })
    fireEvent.change(inputAuthor, {
      target: { value: 'Author' },
    })
    fireEvent.change(inputUrl, {
      target: { value: 'www.testing.com' }
    })
    fireEvent.submit(form)
    expect(mockHandleAdd).toHaveBeenCalled()
    expect(mockHandleAdd.mock.calls).toHaveLength(1)
    console.log(mockHandleAdd.mock.calls)
    expect(mockHandleAdd.mock.calls[0][0].title).toBe('Blog Title')
    expect(mockHandleAdd.mock.calls[0][0].author).toBe('Author')
    expect(mockHandleAdd.mock.calls[0][0].url).toBe('www.testing.com')
  })
})