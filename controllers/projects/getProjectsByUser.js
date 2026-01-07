import { pool } from "../../db.js";

export async function getProjectsByUser(req, res) {
    try {
        const { userId } = req.params;

        const result = await pool.query(
            "SELECT * FROM projects WHERE user_id = $1 ORDER BY id ASC",
            [userId]
        );

        return res.json(result.rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
