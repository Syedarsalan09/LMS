const adminMiddleware = (req, res, next) => {
  try {
    // Check user role
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access Denied. Admin Only.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default adminMiddleware;