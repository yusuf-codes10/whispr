// middlewares/verifyToken.js
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

const verifyToken = (req, res, next) => {
    console.log('all cookies:', req.cookies);
  console.log('token cookie:', req.cookies.token);
  const token = req.cookies.token;
  if (!token) return next(createError(401, "Not authenticated"));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return next(createError(403, "Invalid or expired token"));
  }
};

export default verifyToken;