const express = require("express");
const { router } = require("./Routes/router");


const app = express();


app.use(express.json());
app.use("/", router);
app.listen(4008, () => {
    console.log("server listening..");
})