const Users = require("../users/users-model");

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}`
  );

  next();
}

const validateUserId = async (req, res, next) => {
  // DO YOUR MAGIC
  const user = await Users.getById(req.params.id)

  try {
    if(!user) {
      res.status(404).json({message: "user not found"})
    } else {
      req.user = user
      next()
    }
    } catch (err){
    next(err)
  }

}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  try {
    if(!req.body.name) {
      res.status(400).json({message: "missing required name field"})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  try {
    if(!req.body) {
      res.status(400).json({ message: "missing required name field" })
    } else {
      next()
    }
  } catch (err) {
    next (err)
  }
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost }