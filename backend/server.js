import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rout to get tasks
app.get("/tasks", (req, res) => {
    fs.readFile("./data/tasks.json", "utf-8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading tasks file" });
        res.json(JSON.parse(data));
    });
});

// Create a new task
app.post("/tasks", (req, res) => {
    fs.readFile("./data/tasks.json", "utf-8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading tasks file" });

        const tasks = JSON.parse(data);
        const newTask = req.body;

        newTask.id = Date.now(); // simple auto-id

        tasks.push(newTask);

        fs.writeFile("./data/tasks.json", JSON.stringify(tasks, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Error writing tasks" });
            res.status(201).json(newTask);
        });
    });
});


// Initialize server
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
