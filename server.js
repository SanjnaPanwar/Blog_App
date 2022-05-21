const express = require("express");
const { router } = require("./Routes/router");


const app = express();

const PORT = process.env.PORT || 4008;
app.use(express.json());
app.use("/", router);
app.listen(PORT, () => {
    console.log(`server listening at port ${PORT}`);
})
