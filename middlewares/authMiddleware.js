const bearerToken = process.env.BEARER_TOKEN;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    if (token === bearerToken) {
      return next();
    } else {
      return res.sendStatus(403);
    }
  }
  res.sendStatus(401);
};

module.exports = authMiddleware;
