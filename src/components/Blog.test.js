import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        updateBlog={mockHandleUpdate}
        deleteBlog={mockHandleDelete}
        user={user}
      />
    )
  })

  const blog = {
    author: 'Testing',
    title: 'Test 1',
    url: 'www.testing.com',
    likes: '2',
  }

  const user = {
    name: 'Tester',
    username: 'tester',
  }

  const mockHandleUpdate = jest.fn()
  const mockHandleDelete = jest.fn()

  test('renders blog title and author but not url and likes by default',  () => {
    const defaultBlogContent = component.container.querySelector('.blog')
    const defaultHiddenContent = component.getByTestId('hidden')

    expect(component.container).toHaveTextContent(blog.title)
    expect(defaultBlogContent).not.toHaveStyle('display:none')
    expect(defaultBlogContent).toBeVisible()
    console.log(defaultHiddenContent)
    expect(defaultHiddenContent).toHaveStyle('display:none')
  })

  test('renders blog url and likes when button view is clicked', () => {
    const button = component.getByText('view')

    userEvent.click(button)

    const revealedContent = component.getByTestId('hidden')
    const likes = component.container.querySelector('.likes')

    expect(revealedContent).not.toHaveStyle('display:none')
    expect(revealedContent).not.toHaveClass('blog')
    expect(revealedContent).toBeVisible()
    expect(revealedContent).toHaveTextContent('2')
    expect(likes).toHaveTextContent(blog.likes)
    expect(component.container).toHaveTextContent(blog.url)
  })

  test('like button clicked twice calls event handler passsed as a prop twice', () => {
    const button = component.getByText('like')

    userEvent.click(button)
    userEvent.click(button)

    expect(mockHandleUpdate.mock.calls).toHaveLength(2)
  })

})


