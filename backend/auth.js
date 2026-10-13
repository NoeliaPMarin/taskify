import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { Buffer } from "node:buffer";
import process from "node:process";
import { findUserById } from "./db.js";

const secret = process.env.AUTH_SECRET || "taskify-local-development-secret";

export function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedPassword) {
  const [salt, storedHash] = storedPassword.split(":");
  if (!salt || !storedHash) return false;
  const suppliedHash = scryptSync(password, salt, 64);
  const expectedHash = Buffer.from(storedHash, "hex");
  return suppliedHash.length === expectedHash.length && timingSafeEqual(suppliedHash, expectedHash);
}

export function createToken(userId) {
  const payload = Buffer.from(JSON.stringify({ userId, expiresAt: Date.now() + 7 * 86400000 })).toString("base64url");
  const signature = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

function parseToken(token) {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  const suppliedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (suppliedBuffer.length !== expectedBuffer.length || !timingSafeEqual(suppliedBuffer, expectedBuffer)) return null;

  const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  return decoded.expiresAt > Date.now() ? decoded : null;
}

export async function requireAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, "");
    const payload = token ? parseToken(token) : null;
    if (!payload) return res.status(401).json({ error: "Authentication required" });

    const user = await findUserById(payload.userId);
    if (!user) return res.status(401).json({ error: "Authentication required" });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

export function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, joined: user.joined };
}
