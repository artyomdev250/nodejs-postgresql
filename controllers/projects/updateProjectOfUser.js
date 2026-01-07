import { pool } from "../../db.js";

export async function updateProjectOfUser(req, res) {
    try {
        const { userId, projectId } = req.params;
        const { title, description, status } = req.body;

        const fields = [];
        const values = [];
        let idx = 1;

        const addField = (key, val) => {
            if (val !== undefined) {
                fields.push(`${key} = $${idx}`);
                values.push(val);
                idx++;
            }
        };

        addField("title", title);
        addField("description", description);
        addField("status", status);

        if (fields.length === 0) {
            return res.status(400).json({ error: "No fields provided to update" });
        }

        fields.push(`updated_at = NOW()`);

        values.push(userId, projectId);

        const query = `
            UPDATE projects
            SET ${fields.join(", ")}
            WHERE user_id = $${idx} AND id = $${idx + 1}
            RETURNING *
        `;

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Project not found for this user" });
        }

        return res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
