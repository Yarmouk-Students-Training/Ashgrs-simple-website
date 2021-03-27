const models = require('../models');

// create user
const createUser = async (req, res) => {
    const { name, userEmail, country } = req.body
    try{
      const newUser = await models.user.create({ name, userEmail, country })
      return res.json(newUser)
    } 
    catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
}

// get all users
const getUsers = async (req, res) => {
    try {
      const users = await models.user.findAll()
      return res.json(users)
    } 
    catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
}

// get a specifc user
const getAnUser = async (req, res) => {
    const mail = req.params.email
    try {
      const user = await models.user.findOne({
        where: { mail },
      })
      return res.json(user)
    } 
    catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
}

// delete a specifc user
const deleteUser =  async (req, res) => {
    const email = req.params.email
    try {
      const user = await models.user.findOne({ where: { email } })
      await user.destroy()
      return res.json({ message: 'User deleted!' })
    } 
    catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
}

// update a specifc user
const updateUser = async (req, res) => {
    const email = req.params.email
    console.log(req.body)
    console.log("=================")
    const { new_name, new_email, new_country } = req.body
    try {
      const user = await models.user.findOne({ where: { email } })
      user.name = new_name
      user.email = new_email
      user.country = new_country
      await user.save()
      return res.json(user)
    } 
    catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
}


module.exports =  {
    createUser,
    getUsers,
    getAnUser,
    deleteUser,
    updateUser
}