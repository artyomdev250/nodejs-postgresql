import { pool } from "../../db.js";

export async function createProjectForUser(req, res) {
    try {
        const { userId } = req.params;
        const { title, description, status } = req.body;

        if (!title) {
            return res.status(400).json({ error: "title is required" });
        }

        const query = `
            INSERT INTO projects (user_id, title, description, status)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [userId, title, description ?? null, status ?? "active"];

        const result = await pool.query(query, values);
        return res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === "23503") {
            return res.status(404).json({ error: "User not found" });
        }
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
