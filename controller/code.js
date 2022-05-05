const express = require('express');
const bcrypt = require("bcrypt");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
const knex = require("../Model/dataBase");

// get all data
const getAllData = async (req, res) => {
    let a = await knex.select("*").from("usersDetail");
    res.send(a)
}

// get use by id
const getUserById = async (req, res) => {
    let user = await knex.select("*").from("usersDetail").where("ID", req.params.ID);
    res.send(user);
}

// post data into table
const signUp = async (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.PASSWORD = hashSync(body.PASSWORD, salt);
    const Data = {
        EMAIL: req.body.EMAIL,
        NAME: req.body.NAME,
        PASSWORD: body.PASSWORD

    };
    await knex("usersDetail").insert(Data)
        .then(result => {
            res.send("Record inserted Successfully")
        }).catch((err) => {
            console.log(err.sqlMessage)
            res.status(500).json({
            message:"not inserted",
            "err":err.sqlMessage
            })
        })
}




// postusersdetails
const postUsersDetail = async (req, res) => {
    const Data = {
        USER_ID: req.body.USER_ID,
        TITLE: req.body.TITLE,
        DESCRIPTION: req.body.DESCRIPTION

    }
    await knex("postUsersDetail").insert(Data)

        .then(result => {
            res.send("post Record inserted Successfully")
        }).catch((err) => {
            console.log(err.sqlMessage)
            res.status(500)
            res.json(err.sqlMessage)
        })
}


// login user
const loginUser = async (req, res) => {
    const body = req.body;
    let user = await knex.select("*").from("usersDetail").where("EMAIL", "=", req.body.EMAIL)

    const Data = {
        EMAIL: req.body.EMAIL,
        PASSWORD: bcrypt.hashSync(req.body.PASSWORD, 10)
    }

    const result = bcrypt.compareSync(req.body.PASSWORD,Data.PASSWORD);
    if (result) {
        let token = jwt.sign({ Data: Data }, "Laddu", {
            expiresIn: "1h"
        })
        return res.json({
            message: "Login Successfully",
            "data":user,
            token: token
        });
    } else {
        return res.json({
            message: "Invalide email or password"
        })
    }



}
// like & dislike
const like_dislike = async (req, res) => {
    const Data = {
        USER_ID: req.body.USER_ID,
        LIKE: req.body.LIKE,
        DISLIKE: req.body.DISLIKE

    }
    await knex("Like_Dislike").insert(Data)
        .then(result => {
            res.send("like & dislike Record inserted Successfully")
        }).catch((err) => {
            console.log(err.sqlMessage)
            res.status(500)
            res.json(err.sqlMessage)
        })
}


module.exports = { getAllData, getUserById,signUp, postUsersDetail, loginUser, like_dislike }