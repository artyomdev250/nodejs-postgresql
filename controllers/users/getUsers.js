import { pool } from "../../db.js";

export async function getUsers(req, res) {
    try {
        const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
        return res.json(result.rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
