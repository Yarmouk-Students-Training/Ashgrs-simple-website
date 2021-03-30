const express = require("express")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs');
const models = require('../models')

dotenv.config()
const Router = express.Router()
Router.use(express.json())

Router.post("/refresh", (req, res, next) => {
    const refreshToken = req.body.token;
    if (!refreshToken) {
        return res.json({ message: "Refresh token not found, login again" });
    }
    // If the refresh token is valid, create a new accessToken and return it.
    jwt.verify(refreshToken, "refresh", (err, user) => {
        if (!err) {
            const accessToken = jwt.sign({ userEmail: user.userEmail }, "access", {
                expiresIn: "20s"
            });
            return res.json({ success: true, accessToken });
        } else {
            return res.json({
                success: false,
                message: "Invalid refresh token"
            });
        }
    });
});

async function auth(req, res, next) {
    let token = req.headers["authorization"];
    token = token.split(" ")[1]; //Access token
    jwt.verify(token, "access", async (err, user) => {
        if (user) {
            req.user = user;
            next();
        } 
        else if (err.message === "jwt expired") {
            return res.json({
                success: false,
                message: "Access token expired"
            });
        } 
        else {
            console.log(err);
            return res.status(403).json({ err, message: "User not authenticated" });
        }
    });
}

Router.get("/protected", auth, (req, res) => {
    return res.json({ message: "Protected content!" });
});
  
Router.post('/login', async (req, res) => {
    const userEmail = req.body.userEmail
    const password = req.body.password
    const User = await models.user.findOne({ where:{userEmail} });
    if(User){
        // console.log(User.hashedPassword);
        const matchPassword = await bcrypt.compare(password,User.hashedPassword);
        if(matchPassword){
          // console.log("MATCHED")
            let accessToken = jwt.sign({userEmail}, "access");
            let refreshToken = jwt.sign({userEmail}, "refresh");
            console.log(accessToken)
            console.log(refreshToken)
            return res.status(201).json({
              accessToken,
              refreshToken
            });
        }
        else{
            return res.status(403).json({msg: "some error happened"})
        }
    }
    else return res.status(403).json({msg: "some error happened"})
});

  module.exports = Router;