const jwt = require("jsonwebtoken");

const JSON_SEC_KEY = "arundev@code";

const fetchUser = (req, res, next) => {
  
  const token = req.header("get-token");
  if (!token) {
    res.status(401).json({ message: "access denied" });
  }

  try {
    const data = jwt.verify(token, JSON_SEC_KEY);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "access denied" });
  }
};

module.exports = fetchUser;
