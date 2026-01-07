import { pool } from "../../db.js";

export async function createUser(req, res) {
    try {
        const { name, username, age, city, country, email } = req.body;

        if (!name || !username || !email) {
            return res.status(400).json({ error: "name, username, and email are required" });
        }

        const query = `
      INSERT INTO users (name, username, age, city, country, email)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
        const values = [name, username, age ?? null, city ?? null, country ?? null, email];

        const result = await pool.query(query, values);
        return res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === "23505") {
            return res.status(409).json({ error: "username or email already exists" });
        }
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
