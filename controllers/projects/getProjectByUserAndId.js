import { pool } from "../../db.js";

export async function getProjectByUserAndId(req, res) {
    try {
        const { userId, projectId } = req.params;

        const result = await pool.query(
            "SELECT * FROM projects WHERE user_id = $1 AND id = $2",
            [userId, projectId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Project not found for this user" });
        }

        return res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
