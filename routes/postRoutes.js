const postController = require("../controller/postController")
const express = require("express")

const Router = express.Router()

Router.post('/', postController.createPost );
Router.get('/', postController.getPosts ); 
Router.get('/:post_id', postController.getAnPost );
Router.delete('/:post_id', postController.deletePost ); 
Router.put('/:post_id', postController.updatePost );

module.exports = Router ;
