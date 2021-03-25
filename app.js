const express = require("express")
const { sequelize} = require('./models')
const models = require("./models")

const app = express()
app.use(express.json())

// create user
app.post('/user', async (req, res) => {
    const { name, email, country } = req.body
    try{
      const newUser = await models.user.create({ name, email, country })
      return res.json(newUser)
    } 
    catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
})

// get all users
app.get('/user', async (req, res) => {
    try {
      const users = await models.user.findAll()
      return res.json(users)
    } 
    catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
})

// get a specifc user
app.get('/user/:email', async (req, res) => {
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
})

// delete a specifc user
app.delete('/user/:email', async (req, res) => {
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
})

// update a specifc user
app.put('/user/:email', async (req, res) => {
    const email = req.params.email
    console.log(email)
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
})

app.listen({ port: 5000 }, async () => {
  console.log('Server up on http://localhost:5000')
  await sequelize.authenticate()
  console.log('Database Connected!')
})
