import jwt from 'jsonwebtoken';

export function requireAuth(request, response, next) {
  const authHeader = request.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return response.status(401).json({ message: 'Authentication token is required.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    request.user = payload;
    return next();
  } catch (error) {
    return response.status(401).json({ message: 'Invalid or expired token.' });
  }
}

export function signAdminToken(user) {
  return jwt.sign(
    { id: user._id?.toString?.() || user._id || user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  );
}
