import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable");
}

export interface JWTPayload {
  username: string;
  role: 'admin' | 'user';
}

export function signToken(payload: JWTPayload): string | null {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
  } catch (error) {
    console.error('Error signing token:', error);
    return null;
  }
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    console.error('Invalid or expired token:', error);
    return null;
  }
}
