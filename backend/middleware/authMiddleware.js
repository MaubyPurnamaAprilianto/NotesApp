import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log('Token verification failed:', err.message);
      return res.status(500).json({ message: 'Failed to authenticate token.' });
    }

    req.userId = decoded.id;
    next();
  });
};

export default authMiddleware;
