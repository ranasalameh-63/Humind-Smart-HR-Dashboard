const jwt = require("jsonwebtoken");
const User = require("../Models/usersModel");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = { protect };
