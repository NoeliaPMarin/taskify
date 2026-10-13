import test from "node:test";
import assert from "node:assert/strict";
import { hashPassword, verifyPassword } from "./auth.js";

test("password hashes are salted and verifiable", () => {
  const password = "correct-horse-battery-staple";
  const first = hashPassword(password);
  const second = hashPassword(password);
  assert.notEqual(first, second);
  assert.equal(verifyPassword(password, first), true);
  assert.equal(verifyPassword("wrong-password", first), false);
});

test("invalid stored password values are rejected", () => {
  assert.equal(verifyPassword("password", "invalid"), false);
});
