const postController = require("../controller/postController")
const express = require("express")
const tokenRouter = require("../models/tokens")
const Router = express.Router()

Router.post('/', tokenRouter.auth(),postController.createPost );
Router.get('/', postController.getPosts ); 
Router.get('/:id', postController.getAnPost );
Router.delete('/:id', postController.deletePost ); 
Router.put('/:id', postController.updatePost );

module.exports = Router ;
