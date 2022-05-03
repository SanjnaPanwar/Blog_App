const express = require("express");
const router = express.Router();

const code = require("../controller/code");

router.get("/api/get",code.getData);
router.post("/api/post",code.verifyToken, code.PostData);

router.post("/api/postUsersDetail", code.postUsersDetail);

router.post("/api/login",code.loginUser);

module.exports = { router }