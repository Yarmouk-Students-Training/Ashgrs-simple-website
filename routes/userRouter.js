const userController = require("../controller/userController")
const express = require("express")

const Router = express.Router()

Router.post('/', UserController.createUser ); // All Users 
Router.get('/', UserController.getUsers ); // All Users 
Router.get('/:email', UserController.getAnUser ); // Specific User
Router.delete('/:email', UserController.deleteUser ); // Delete Specific User
Router.put('/:email', UserController.updateUser )

module.exports = Router ;