/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-01-14 23:24:08
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-01-15 02:05:58
 * @FilePath: \Fullstack2023\part5\bloglist-frontend\cypress\e2e\blog_app.cy.js
 * @Description:
 *
 * Copyright (c) 2024 by zihao, All Rights Reserved.
 */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      username: 'YYY',
      name: 'yyy',
      password: '654321'
    }
    cy.request('POST', 'http://localhost:3001/api/user', user)

    cy.visit('http://localhost:5173')

    // cy.intercept('GET', '/api/blogs', {
    //   statusCode: 200,
    //   body: [
    //     // 您可以在这里提供模拟的博客数据
    //     { id: 1, title: 'Mock Blog 1', author: 'Author 1', url: 'http://example.com/1', likes: 10 },
    //     { id: 2, title: 'Mock Blog 2', author: 'Author 2', url: 'http://example.com/2', likes: 20 },
    //     // ...更多博客数据
    //   ],
    // }).as('getBlogs')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
  })



  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="Username"]').type('YYY')
      cy.get('input[name="Password"]').type('654321')
      cy.get('button').contains('login').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input[name="Username"]').type('YYY')
      cy.get('input[name="Password"]').type('123456')
      cy.get('button').contains('login').click()

      cy.get('.error').should('contain', 'Wrong credentials')
      // Assuming your app shows an error message with class 'error' for failed logins
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // Log in user here
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'yourUsername',
        password: 'yourPassword'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:5173')
      })
    })

    it('A blog can be created', function() {
      // Click the button to open the form for a new blog
      cy.contains('new blog').click()

      cy.get('#title').type('New Blog Title')
      cy.get('#author').type('Blog Author')
      cy.get('#url').type('https://blogurl.com')

      cy.contains('create').click()
      cy.contains('New Blog Title')
    })

    it('Users can like a blog', function() {
      cy.contains('Blog Title').parent().as('blogPost')

      cy.get('@blogPost').find('.likeButton').click()
      cy.get('@blogPost').should('contain', 'Likes: 1')
    })

  })





})