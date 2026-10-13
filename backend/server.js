import express from "express";
import { randomUUID } from "node:crypto";
import process from "node:process";
import cors from "cors";
import { createToken, hashPassword, publicUser, requireAuth, verifyPassword } from "./auth.js";
import { createTask, createUser, deleteTask, findUserByEmail, initializeDatabase, listTasks, saveMessage, updateTask, updateUserName, usesDatabase } from "./db.js";

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const allowedStatuses = new Set(["In Progress", "Complete", "Not Started"]);

const configuredOrigins = process.env.CORS_ORIGIN
  ?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({ origin: configuredOrigins?.length ? configuredOrigins : true }));
app.use(express.json({ limit: "100kb" }));

function validateTask(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return "Request body must be an object";
  }

  const requiredFields = ["title", "list", "status", "dueDate"];
  const missingField = requiredFields.find(
    (field) => typeof input[field] !== "string" || !input[field].trim(),
  );

  if (missingField) return `${missingField} is required`;
  if (!allowedStatuses.has(input.status)) return "Invalid task status";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.dueDate)) return "Invalid due date";
  if (input.description != null && typeof input.description !== "string") {
    return "description must be a string";
  }

  return null;
}

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/auth/signup", async (req, res, next) => {
  const name = req.body?.name?.trim();
  const email = req.body?.email?.trim().toLowerCase();
  const password = req.body?.password;
  if (!name || !email || typeof password !== "string" || password.length < 8) {
    return res.status(400).json({ error: "Name, email and a password of at least 8 characters are required" });
  }

  try {
    if (await findUserByEmail(email)) return res.status(409).json({ error: "An account already exists" });
    const user = { id: Date.now(), name, email, password: hashPassword(password), joined: new Date().toISOString() };
    await createUser(user);
    res.status(201).json({ token: createToken(user.id), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

app.post("/auth/login", async (req, res, next) => {
  const email = req.body?.email?.trim().toLowerCase();
  const password = req.body?.password;
  try {
    const user = await findUserByEmail(email);
    if (!user || typeof password !== "string" || !verifyPassword(password, user.password)) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.json({ token: createToken(user.id), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

app.post("/auth/demo", async (_req, res, next) => {
  try {
    const id = Date.now();
    const user = { id, name: "Demo User", email: `demo-${id}@taskify.local`, password: hashPassword(randomUUID()), joined: new Date().toISOString() };
    await createUser(user);
    const dueDate = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
    await createTask({ id: id + 1, ownerId: id, title: "Explore Taskify", list: "Getting started", description: "Open, edit or complete this task.", status: "In Progress", dueDate });
    await createTask({ id: id + 2, ownerId: id, title: "Create your first task", list: "Getting started", description: "Use the Add Task button to try the complete workflow.", status: "Not Started", dueDate });
    res.status(201).json({ token: createToken(user.id), user: publicUser(user) });
  } catch (error) { next(error); }
});

app.get("/auth/me", requireAuth, (req, res) => res.json({ user: publicUser(req.user) }));

app.put("/auth/me", requireAuth, async (req, res, next) => {
  const name = req.body?.name?.trim();
  if (!name) return res.status(400).json({ error: "Name is required" });
  try {
    const user = await updateUserName(req.user.id, name);
    res.json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

app.post("/auth/forgot-password", (_req, res) => {
  res.json({ message: "If the account exists, password reset instructions will be sent." });
});

app.post("/contact", async (req, res, next) => {
  const name = req.body?.name?.trim();
  const email = req.body?.email?.trim();
  const message = req.body?.message?.trim();
  if (!name || !email || !message) return res.status(400).json({ error: "All fields are required" });
  try {
    await saveMessage({ id: Date.now(), name, email, message, createdAt: new Date().toISOString() });
    res.status(201).json({ message: "Message sent" });
  } catch (error) {
    next(error);
  }
});

app.get("/tasks", requireAuth, async (req, res, next) => {
  try {
    res.json(await listTasks(req.user.id));
  } catch (error) {
    next(error);
  }
});

app.post("/tasks", requireAuth, async (req, res, next) => {
  const validationError = validateTask(req.body);
  if (validationError) return res.status(400).json({ error: validationError });

  try {
    const newTask = {
      id: Date.now(),
      ownerId: req.user.id,
      title: req.body.title.trim(),
      list: req.body.list.trim(),
      description: req.body.description?.trim() || "",
      status: req.body.status,
      dueDate: req.body.dueDate,
    };

    await createTask(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
});

app.put("/tasks/:id", requireAuth, async (req, res, next) => {
  const taskId = Number(req.params.id);
  if (!Number.isSafeInteger(taskId)) return res.status(400).json({ error: "Invalid task id" });

  const validationError = validateTask(req.body);
  if (validationError) return res.status(400).json({ error: validationError });

  try {
    const task = {
      id: taskId,
      ownerId: req.user.id,
      title: req.body.title.trim(),
      list: req.body.list.trim(),
      description: req.body.description?.trim() || "",
      status: req.body.status,
      dueDate: req.body.dueDate,
    };
    if (!await updateTask(task)) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (error) {
    next(error);
  }
});

app.delete("/tasks/:id", requireAuth, async (req, res, next) => {
  const taskId = Number(req.params.id);
  if (!Number.isSafeInteger(taskId)) return res.status(400).json({ error: "Invalid task id" });

  try {
    if (!await deleteTask(taskId, req.user.id)) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted", id: taskId });
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, next) => {
  void next;
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
});

initializeDatabase()
  .then(() => app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT} (${usesDatabase ? "PostgreSQL" : "local JSON"})`)))
  .catch((error) => { console.error("Database initialization failed", error); process.exit(1); });
