const jwt = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.json({
            message: "Invalid token",
          });
        } else {
          next();
        }
      });
    } else {
      res.json({ message: "Access denied!" });
    }
  },
};
