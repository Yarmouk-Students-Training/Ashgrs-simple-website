const express = require("express")
const { sequelize} = require('./models')
const models = require("./models")
const Routes = require("./routes");

const app = express()
app.use(express.json())

app.use('/users', Routes.userRouter);
app.use('/posts',Routes.postRouter);

app.listen({ port: 5000 }, async () => {
  console.log('Server up on http://localhost:5000')
  await sequelize.authenticate()
  console.log('Database Connected!')
})
