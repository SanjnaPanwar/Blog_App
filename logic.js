const express = require('express');
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
const knex = require("../Model/dataBase");

// get all data
const getData = async (req, res) => {
    a = await knex.select("*").from("usersDetail");
    res.send(a)
}

// post data into table
const PostData = async (req, res) => {
    const Data = {
        EMAIL: req.body.EMAIL,
        NAME: req.body.NAME,
        PASSWORD: req.body.PASSWORD

    };
    await knex.insert(Data).into("usersDetail")
    res.json({
        message:"Data Inserted Successfully"
    })
    jwt.verify(req.token, "secretKey", (err, authData) => {
        if (err) {
            res.sendStatus(403);  //forbidden
        } else {
            res.json({
                message: "Post Created",
                authData
            });
        }
    })
}
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== "undefined") {
        const bearerToken = bearerHeader.split(" ")[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }
}

// postusersdetails
const postUsersDetail = async (req, res) => {
    const Data = {
        USER_ID: req.body.USER_ID,
        TITLE: req.body.TITLE,
        DESCRIPTION: req.body.DESCRIPTION

    }
    await knex.insert(Data).into("postUsersDetail")
    res.json({
        message:"Data Inserted Successfully"
    })

    // jwt.sign({ Data: Data }, "secretKey", (err, token) => {
    //     res.json({
    //         token,
    //     });
    // })
}

// login user
const loginUser = async (req, res) => {
    const Data = {
        EMAIL: req.body.EMAIL,
        PASSWORD: req.body.PASSWORD
    }
    jwt.sign({ Data: Data }, "secretKey", (err, token) => {
        res.json({
            token
        });
    })
}


// like & dislike


const like_dislike = async (req, res) => {
    const Data = {
        USER_ID: req.body.USER_ID,
        LIKE: req.body.LIKE,
        DISLIKE: req.body.DISLIKE

    }
    await knex.insert(Data).into("Like_Dislike")
    // if(err) throw err;
    // else{
    res.json({
        message:"Data Inserted"
    })
    // }
    // jwt.sign({ Data: Data }, "secretKey", (err, token) => {
    //     res.json({
    //         token
    //     });
    // })
}




module.exports = { PostData, verifyToken, postUsersDetail, loginUser, getData, like_dislike }