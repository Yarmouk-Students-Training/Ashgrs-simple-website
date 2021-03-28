const express = require("express")
const jwt = require('jsonwebtoken')
const { sequelize} = require('./models')
const models = require('./models')
const postRoutes = require('./router/postRoutes.js');
const userRoutes = require('./router/userRouter.js');
const commentRoutes = require('./router/commentRouter.js');
const friendRouter = require('./router/friendRouter.js')


const app = express()
app.use(express.json())

app.get('/api' , (req,res)=>{
  return res.json({
    messege : "we are in api route (:"
  })
})

app.post('/api/login', (req, res) => {
  const user = {
    id: 1, 
    username: 'fake',
    email: 'fake@gmail.com'
  }

  jwt.sign({user}, 'secretkey', (err, token) => {
    res.json({
      token
    });
  });
});

app.post('/api/posts', verifyToken, (req, res) => {  
    jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } 
    else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});

function verifyToken(req, res, next) { 
  const tempHeader = req.headers['authorization'];
  if(typeof tempHeader !== 'undefined') {
    const temp = tempHeader.split(' ');
    console.log(temp);
    console.log("==============")
    const tempToken = temp[1];
    req.token = tempToken;
    next();
  } 
  else {
    res.sendStatus(403);
  }
}

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
// sequelize.sync({alter:true})