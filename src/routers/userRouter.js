const  express = require("express");
const { getUsers } = require("../controllers/userController");
const userRouter = express.Router();


const users = [
    {id:1, name:'Nomayen Hosasain'},
    {id:2, name:' Shahanika Hossain'},
    {id:3, name:'ethikahin'}
]

userRouter.get("/", getUsers);


module.exports = userRouter;