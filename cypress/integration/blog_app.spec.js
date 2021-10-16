// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Test One',
            username: 'testone',
            password: 'testing'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        const userTwo = {
            name: 'Test Two',
            username: 'testtwo',
            password: 'testing2'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', userTwo)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('login to application')
        
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login to application').click()
            cy.get('#username').type('testone')
            cy.get('#password').type('testing')
            cy.contains('Submit').click()
            cy.contains('logout').click()

            cy.contains('Test One successfully logged in')
        })

        it('fails with wrong credentials', function() {
            cy.contains('login to application').click()
            cy.get('#username').type('testone')
            cy.get('#password').type('wrong')
            cy.contains('Submit').click()

            cy.get('.error')
            .should('contain', 'invalid username or password')
            .and('have.css', 'color', 'rgb(255, 0, 0)')

        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'testone', password: 'testing'})
        })

        it('A blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('Monday')
            cy.get('#author').type('Tester 1')
            cy.get('#url').type('www.testing.com')
            cy.get('#likes').type('3')
            cy.get('#create-button').click()

            cy.get('html').should('contain', 'Monday Tester 1')
        })

        describe('a blog exists', function() {
            beforeEach(function() {
                cy.createBlog({
                    title: 'Tuesday',
                    author: 'Tester 2',
                    url: 'www.testingtwo.com',
                    likes: '2'
                    })
                })

            it('user can like a blog', function() {
                cy.get('#view').click()
                cy.get('#like').click()
    
                cy.get('.likes').contains('3')
            })

            it.only('delete blog', function() {
                cy.get('#view').click()
                cy.get('#delete').click()
    
                cy.contains('view').should('not.exist')
            })
        })
        
        describe('many blogs exist', function() {
            beforeEach(function() {
                cy.createBlog({
                    title: 'Wednesday',
                    author: 'Tester 3',
                    url: 'www.testingthree.com',
                    likes: '3'
                })
                cy.createBlog({
                    title: 'Thursday',
                    author: 'Tester 4',
                    url: 'www.testingfour.com',
                    likes: '4'
                })
                cy.createBlog({
                    title: 'Friday',
                    author: 'Tester 5',
                    url: 'www.testingfive.com',
                    likes: '5'
                })
            })

            it('blogs with likes in descending order', function() {
                cy.get('html').first().as('firstBlog')
                cy.get('@firstBlog').find('.likes').should('contain', '5')
                cy.get('html').last().as('thirdBlog')
                cy.get('@thirdBlog').find('.likes').should('contain', '3')
            })

        

        })

        describe('another user logged in', function() {
            beforeEach(function() {
                cy.createBlog({
                    title: 'Wednesday',
                    author: 'Tester 3',
                    url: 'www.testingthree.com',
                    likes: '3'
                })
            })
    
            it('other user cannot delete blog', function() {
                cy.contains('logout').click()
                cy.login({ username: 'testtwo', password: 'testing2'})
                cy.get('#view').click()
    
                cy.contains('delete').should('not.exist')
            })   
            })   
    })

    
})