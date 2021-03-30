const express = require("express")
const { sequelize} = require('./models')
const postRoutes = require('./router/postRoutes.js');
const userRoutes = require('./router/userRouter.js');
const commentRoutes = require('./router/commentRouter.js');
const friendRouter = require('./router/friendRouter.js')
const tokenRouter = require('./router/tokensRoute')

const app = express()
app.use(express.json())

app.use(tokenRouter);
app.use('/users', userRoutes);
app.use('/posts',postRoutes);
app.use('/comment',commentRoutes);
app.use('/friend',friendRouter)

app.listen({ port: 5000 }, async () => {
  console.log('Server up on http://localhost:5000')
  await sequelize.authenticate()
  console.log('Database Connected!')
})

// sequelize.sync() 
// sequelize.sync({force:true})