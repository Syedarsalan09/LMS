import jwt from "jsonwebtoken";

// ===============================
// Protect Routes
// ===============================
const authMiddleware = (req, res, next) => {
  try {
    // Get Authorization Header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    // Extract Token
    const token = authHeader.split(" ")[1];

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save logged-in user
    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

export const optionalAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next();
  }

  try {
    req.user = jwt.verify(
      authHeader.split(" ")[1],
      process.env.JWT_SECRET
    );
  } catch {
    // Invalid or expired tokens should not prevent public book browsing.
  }

  return next();
};

export default authMiddleware;