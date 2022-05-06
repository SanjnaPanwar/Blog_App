const express = require("express");
const router = express.Router();


const code = require("../controller/code");
const verification = require("../auth/tokenValidation")

router.get("/api/get/all", code.getAllData);
router.get("/api/get/:ID", code.getUserById);

router.post("/api/signup", code.signUp);
router.post("/api/post", verification, code.postUsersDetail);

router.post("/api/login", code.loginUser);

router.post("/api/like_dislike", verification, code.like_dislike)
router.get("/api/getAllDetailsOfUser",code.getAllDetailsOfUser)

module.exports = { router }