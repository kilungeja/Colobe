const jwt = require("jsonwebtoken");

exports.isAuth = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  jwt.verify(token, "superlongsecretword", function(err, decoded) {
    if (err) {
      console.log(err);
      return res.status(401).json({ msg: "Not authorized" });
    }
    const {
      data: { _id }
    } = decoded;
    req.userId = _id;
    next();
  });
};
