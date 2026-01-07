import { pool } from "../../db.js";

export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { name, username, age, city, country, email } = req.body;

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

        addField("name", name);
        addField("username", username);
        addField("age", age);
        addField("city", city);
        addField("country", country);
        addField("email", email);

        if (fields.length === 0) {
            return res.status(400).json({ error: "No fields provided to update" });
        }

        values.push(id);

        const query = `
      UPDATE users
      SET ${fields.join(", ")}
      WHERE id = $${idx}
      RETURNING *
    `;

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json(result.rows[0]);
    } catch (err) {
        if (err.code === "23505") {
            return res.status(409).json({ error: "username or email already exists" });
        }
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
