import { pool } from "../../db.js";

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json({ deleted: true, user: result.rows[0] });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
