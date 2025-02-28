import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization;
  if (!token) {
    return res
      .status(403)
      .json({ message: "Unauthorized , JWT token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: error.message || "Unauthorized , JWT token not valid" });
  }
};

export default isAuthenticated;
