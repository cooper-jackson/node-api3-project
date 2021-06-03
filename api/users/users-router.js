const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const Users = require('./users-model')
const Posts = require('../posts/posts-model')
const { logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware')

const router = express.Router();

router.get('/', async (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  try {
    const users = await Users.get()
    res.json(users)
  } catch(err) { next(err) }
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  try {
  res.status(200).json(req.user)
  } catch(err) { next (err)}
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const newUser = req.body
  try {
    Users.insert(newUser)
    res.status(200).json(newUser)
  } catch (err) { next(err) }
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  const newUser = req.body
  try {
    await Users.update(req.params.id, req.body)
    console.log(req.body)
    res.status(200).json(newUser)
  } catch(err) {
    next(err)
  }
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    Users.remove(req.params.id)
    .then(user => {
      res.status(200).json(req.body)
    })
    .catch(err => {
      console.log(err)
    })
  } catch (err) {
    next (err)
  }
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try {
    Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err)
    })
  } catch (err) {
    next(err)
  }
});

router.post('/:id/posts', validateUserId, validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

});

// do not forget to export the router

router.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: 'something has gone wrong with the users router, please investigate'
  })
})

module.exports = router