import express from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/userRoutes.js";
import projectsRouter from "./routes/projectRoutes.js";
import { pool } from "./db.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/health", async (req, res) => {
    try {
        await pool.query("SELECT 1");
        res.json({ ok: true, db: "connected" });
    } catch (e) {
        res.status(500).json({ ok: false, db: "disconnected" });
    }
});

app.get("/", (req, res) => res.send("Hello World"));

app.use("/api", usersRouter);
app.use("/api", projectsRouter);

const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
