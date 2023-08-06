
module.exports.allowIfLoggedin = async (req, res, next) => {
  var HeaderToken = req.headers["authorization"];
  if (!HeaderToken) {
    return res.status(403).send({
      status: false,
      message: "A token is required for authentication",
    });
  }
  try {
    let user;
    var token = req.headers["authorization"].replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next()
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      status: false,
      message: "Invalid token provided.",
    });
  }
};
