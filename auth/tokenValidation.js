const jwt = require("jsonwebtoken");

const verification = (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
        token = token.slice(7);
        jwt.verify(token, "Laddu", (err, decoded) => {
            if (err) {
                res.json({
                    message: "Invalide token",
                })
            } else {

                next()
            }
        })
    }else {
        res.json({
            message: "Access denied unauthorized user"
        })
    }


}


module.exports = verification;