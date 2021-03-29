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

app.get('/tokens' , async (req,res)=>{
  try {
    const Tokens = await models.tokens.findAll()
    return res.json(Tokens)
  } 
  catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.post('/login', async (req, res) => {
  const userEmail = req.body.email
  const User = models.user.findOne({ where:{userEmail} });
  if(User !== undefined){
    const flag = models.tokens.findOne({where:{userEmail}});
    if(flag){
      return res.json({msg: "Token already exist for this user" })
    }
    jwt.sign({userEmail}, 'secretkey', (err, token) => {
        const newToken = models.tokens.create({userEmail, token });
        return res.json({msg: "Token created successfuly" , newToken})
    });
  }
  else return res.json({msg: "some error happened"})
});

app.post('/logout' , async (req,res)=>{
  const userEmail = req.body.email;
  const User = models.user.findOne({ where:{userEmail} });
  if(User !== undefined){
    const flag = await models.tokens.findOne({where:{userEmail}});
    // console.log("==============")
    // console.log(flag);
    // console.log(User);
    // console.log("==============")
    if(flag){
      flag.destroy();
      return res.json({msg :"token deleted"});
    }
    else{
      return res.json({msg :"user token does not exist"});
    }
  }
  else return res.json({msg: "some error happened"})
})

app.post('/api/posts', verifyToken, async (req, res) => {  
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