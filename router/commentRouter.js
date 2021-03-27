const commentController = require("../controller/commentController")
const express = require("express")

const Router = express.Router()

Router.post('/', commentController.commentCreate );
Router.get('/:id', commentController.postCommentsGet ); 
Router.delete('/:id', commentController.commentDelete );


module.exports = Router ;
