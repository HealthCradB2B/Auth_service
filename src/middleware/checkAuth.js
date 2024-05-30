// middlewares/checkAuth.js
import { verifyJwtToken } from "../utils/token.util.js";

const checkAuth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ type: "error", message: "No token provided" });
  }

  try {
    const userId = verifyJwtToken(token);
    req.user = { userId }; 
    next();
  } catch (err) {
    res.status(401).json({ type: "error", message: "Unauthorized" });
  }
};

export default checkAuth;
