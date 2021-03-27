const FriendController = require("../controller/friendController")
const express = require("express")

const Router = express.Router()

Router.get('/' , FriendController.getFriends);
Router.post('/' , FriendController.makeFriendship);
Router.delete('/', FriendController.deleteFriendship);

module.exports = Router;