const jwt = require("jsonwebtoken");

const protect = (allowedRoles = []) => (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (allowedRoles.length && !allowedRoles.includes(decoded.role))
      return res.status(403).json({ success: false, message: "Access denied" });

    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Token invalid" });
  }
};

module.exports = protect;
