const jwt = require("jsonwebtoken");

exports.isAuth = (req, res, next) => {
  let token;
  try {
    token = req.get("Authorization").split(" ")[1];
  } catch (error) {
    return res.status(401).json({ msg: "Not authorized" });
  }
  jwt.verify(token, "superlongsecretword", function(err, decoded) {
    if (err) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    const {
      data: { _id }
    } = decoded;
    req.userId = _id;
    next();
  });
};
