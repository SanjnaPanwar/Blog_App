const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")


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
    jwt.verify(req.token,"secretKey",(err,authData)=>{
        if(err){
            res.sendStatus(403);  //forbidden
        }else{
            res.json({
                message:"Post Created",
                authData
            });
        }
    })
//     // await knex("usersDetail").insert(Data)
//     //     // res.send(Data)
//     //     .then(result => {
//     //         res.send("Record inserted Successfully")
//     //     }).catch((err) => {
//     //         console.log(err.sqlMessage)
//     //         res.status(500)
//     //         res.json(err.sqlMessage)
//     //     })
    // jwt.sign({ Data: Data }, "secretKey", (err, token) => {
    //     res.json({
    //         message: "Record inserted Successfully",
    //         token
    //     });
    // })
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
        // USER_ID: req.body.USER_ID,
        USER_ID: req.body.USER_ID,
        TITLE: req.body.TITLE,
        DESCRIPTION: req.body.DESCRIPTION

    }
    jwt.sign({ Data: Data }, "secretKey", (err, token) => {
        res.json({
            token,
        });
    })
}
// await knex("postUsersDetail").insert(Data)

//     .then(result => {
//         res.send("Record inserted Successfully")
//     }).catch((err) => {
//         console.log(err.sqlMessage)
//         res.status(500)
//         res.json(err.sqlMessage)
//     })
// }
// const loginUser = async (req, res) => {
//     const Data = {
//         EMAIL: req.body.EMAIL,
//         PASSWORD: req.body.PASSWORD
//     }

//     let a = await knex.select("*").from("usersDetail").where("EMAIL", req.body.EMAIL);
//     res.send("Login Successfull")
// };


// const loginUser = async (req, res) => {
//     const Data = {
//         EMAIL: req.body.EMAIL,
//         PASSWORD: req.body.PASSWORD
//     }
//     // console.log(Data);
//     await knex.select("*").from("usersDetail").where("EMAIL", req.body.EMAIL)
//         .then(user => {
//             if (user.length < 1) {
//                 return res.status(404).json({
//                     message: "E-mail not found"
//                 })
//             }
//             bcrypt.compare(req.body.PASSWORD, user[0].PASSWORD, (err, result) => {
//                 if (err) {
//                     return res.status(401).json({
//                         message: "Authantication fail"
//                     })
//                 }
//                 else if (result) {
//                     return res.status(200).json({
//                         message: "Authantication successfull"
//                     });
//                 };
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         })

// }

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



module.exports = { PostData, verifyToken, postUsersDetail, loginUser, getData }