import { pool } from "../../db.js";

export async function getUserById(req, res) {
    try {
        const { id } = req.params;

        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
