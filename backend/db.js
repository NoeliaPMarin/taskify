import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import pg from "pg";

const directory = path.join(path.dirname(fileURLToPath(import.meta.url)), "data");
const pool = process.env.DATABASE_URL
  ? new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
  : null;

export const usesDatabase = Boolean(pool);

export async function initializeDatabase() {
  if (!pool) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGINT PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL, joined TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS tasks (
      id BIGINT PRIMARY KEY, owner_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      title TEXT NOT NULL, list TEXT NOT NULL, description TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL, due_date DATE NOT NULL
    );
    CREATE TABLE IF NOT EXISTS messages (
      id BIGINT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL,
      message TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function readJson(name) { return JSON.parse(await readFile(path.join(directory, name), "utf8")); }
async function writeJson(name, data) { await writeFile(path.join(directory, name), JSON.stringify(data, null, 2)); }

export async function findUserByEmail(email) {
  if (!pool) return (await readJson("users.json")).find((user) => user.email === email);
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return rows[0] ? mapUser(rows[0]) : undefined;
}

export async function findUserById(id) {
  if (!pool) return (await readJson("users.json")).find((user) => user.id === id);
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0] ? mapUser(rows[0]) : undefined;
}

export async function createUser(user) {
  if (!pool) { const users = await readJson("users.json"); users.push(user); await writeJson("users.json", users); return user; }
  await pool.query("INSERT INTO users (id, name, email, password, joined) VALUES ($1,$2,$3,$4,$5)", [user.id, user.name, user.email, user.password, user.joined]);
  return user;
}

export async function updateUserName(id, name) {
  if (!pool) { const users = await readJson("users.json"); const user = users.find((item) => item.id === id); user.name = name; await writeJson("users.json", users); return user; }
  const { rows } = await pool.query("UPDATE users SET name=$1 WHERE id=$2 RETURNING *", [name, id]);
  return mapUser(rows[0]);
}

export async function listTasks(ownerId) {
  if (!pool) return (await readJson("tasks.json")).filter((task) => task.ownerId === ownerId);
  const { rows } = await pool.query("SELECT * FROM tasks WHERE owner_id=$1 ORDER BY id DESC", [ownerId]);
  return rows.map(mapTask);
}

export async function createTask(task) {
  if (!pool) { const tasks = await readJson("tasks.json"); tasks.push(task); await writeJson("tasks.json", tasks); return task; }
  await pool.query("INSERT INTO tasks (id,owner_id,title,list,description,status,due_date) VALUES ($1,$2,$3,$4,$5,$6,$7)", [task.id, task.ownerId, task.title, task.list, task.description, task.status, task.dueDate]);
  return task;
}

export async function updateTask(task) {
  if (!pool) { const tasks = await readJson("tasks.json"); const index = tasks.findIndex((item) => item.id === task.id && item.ownerId === task.ownerId); if (index < 0) return null; tasks[index] = task; await writeJson("tasks.json", tasks); return task; }
  const { rowCount } = await pool.query("UPDATE tasks SET title=$1,list=$2,description=$3,status=$4,due_date=$5 WHERE id=$6 AND owner_id=$7", [task.title, task.list, task.description, task.status, task.dueDate, task.id, task.ownerId]);
  return rowCount ? task : null;
}

export async function deleteTask(id, ownerId) {
  if (!pool) { const tasks = await readJson("tasks.json"); const index = tasks.findIndex((task) => task.id === id && task.ownerId === ownerId); if (index < 0) return false; tasks.splice(index, 1); await writeJson("tasks.json", tasks); return true; }
  const result = await pool.query("DELETE FROM tasks WHERE id=$1 AND owner_id=$2", [id, ownerId]);
  return Boolean(result.rowCount);
}

export async function saveMessage(message) {
  if (!pool) { const messages = await readJson("messages.json"); messages.push(message); await writeJson("messages.json", messages); return; }
  await pool.query("INSERT INTO messages (id,name,email,message,created_at) VALUES ($1,$2,$3,$4,$5)", [message.id, message.name, message.email, message.message, message.createdAt]);
}

function mapUser(row) { return { ...row, id: Number(row.id), joined: new Date(row.joined).toISOString() }; }
function mapTask(row) { return { id: Number(row.id), ownerId: Number(row.owner_id), title: row.title, list: row.list, description: row.description, status: row.status, dueDate: row.due_date instanceof Date ? row.due_date.toISOString().slice(0, 10) : String(row.due_date) }; }
