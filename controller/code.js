const express = require('express');
const bcrypt = require("bcrypt");
const cookie=require("cookie-parser")
const {genSaltSync, hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
const knex = require("../Model/dataBase");

// get all data
const getAllData =  (req, res) => {
    let usersDetails =  knex.select("*").from("usersDetail");
    res.send(usersDetails)
}

// get use by id
const getUserById =  (req, res) => {
    let user =  knex.select("*").from("usersDetail").where("ID", req.params.ID);
    res.send(user);
}

// post data into table
const signUp =  (req, res) => {

    if (!req.body.NAME || !req.body.EMAIL || !req.body.PASSWORD) {
        res.send({
            success: false,
            status: 400,
            message: "something is missing in your Information"
        })
        console.log({
            success: false,
            status: 400,
            message: "something is missing in your Information"
        });
    }

    const body = req.body;
    const salt = genSaltSync(10);
    body.PASSWORD = hashSync(body.PASSWORD, salt);
    const Data = {
        EMAIL: req.body.EMAIL,
        NAME: req.body.NAME,
        PASSWORD: body.PASSWORD

    };
     knex("usersDetail").insert(Data)
        .then(result => {
            res.send("Record inserted Successfully")
        }).catch((err) => {
            console.log(err.sqlMessage)
            res.status(500).send({
                message: "not inserted",
                "err": err.sqlMessage
            })
        })
}




// postusersdetails
const postUsersDetail =  (req, res) => {

    if (!req.body.USER_ID || !req.body.TITLE || !req.body.DESCRIPTION) {
        res.send({
            success: false,
            status: 400,
            message: "something is missing in your Information"
        })
        console.log({
            success: false,
            status: 400,
            message: "something is missing in your Information"
        });
    }

    const Data = {
        USER_ID: req.body.USER_ID,
        TITLE: req.body.TITLE,
        DESCRIPTION: req.body.DESCRIPTION

    }
     knex("postUsersDetail").insert(Data)

        .then(result => {
            res.send("post Record inserted Successfully")
        }).catch((err) => {
            console.log(err.sqlMessage)
            res.status(500)
            res.send(err.sqlMessage)
        })
}


// login user
const loginUser =  (req, res) => {
    const body = req.body;
    let user =  knex.select("*").from("usersDetail").where("EMAIL", "=", req.body.EMAIL)

    const Data = {
        EMAIL: req.body.EMAIL,
        PASSWORD: bcrypt.hashSync(req.body.PASSWORD, 10)
    }

    const result = bcrypt.compareSync(req.body.PASSWORD, Data.PASSWORD);
    if (result) {
        let token = jwt.sign({ "Data": Data }, "Laddu", {
            expiresIn: "1h"
        })
        res.cookie("token",token)
        return res.json({
            "message": "Login Successfully",
            // "data": user,
            "token": token
        })
    } else {
        return res.json({
            "message": "Invalide email or password"
        })
    }



}
// like & dislike
const like_dislike =  (req, res) => {

    if (!req.body.USER_ID || !req.body.LIKE || !req.body.DISLIKE) {
        res.send({
            success: false,
            status: 400,
            message: "something is missing in your Information"
        })
        console.log({
            success: false,
            status: 400,
            message: "something is missing in your Information"
        });
    }
    const Data = {
        USER_ID: req.body.USER_ID,
        LIKE: req.body.LIKE,
        DISLIKE: req.body.DISLIKE

    }

     knex("Like_Dislike").insert(Data)
        .then(result => {
            res.send("like & dislike Record inserted Successfully")
        }).catch((err) => {
            console.log(err.sqlMessage)
            res.status(500)
            res.send(err.sqlMessage)
        })
}

const getAllDetailsOfUser =  (req, res) => {
    let allTables =  knex('usersDetail').join('postUsersDetail', "usersDetail.ID", "=", "postUsersDetail.USER_ID").join('Like_Dislike', 'postUsersDetail.USER_ID', '=', 'Like_Dislike.USER_ID').select("*")
    res.send(allTables)

}

module.exports = { getAllData, getUserById, signUp, postUsersDetail, loginUser, like_dislike, getAllDetailsOfUser }