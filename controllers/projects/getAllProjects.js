import { pool } from "../../db.js";

export async function getAllProjects(req, res) {
    try {
        const result = await pool.query("SELECT * FROM projects ORDER BY id ASC");
        return res.json(result.rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
