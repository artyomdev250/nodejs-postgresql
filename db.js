import dotenv from "dotenv";
import pg from "pg";

dotenv.config({ path: ".env.local" });

const { Pool } = pg;

const connectionString =
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL;

export const pool = new Pool(
    connectionString
        ? {
            connectionString,
            ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
        }
        : {
            host: process.env.PGHOST,
            port: Number(process.env.PGPORT || 5432),
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            database: process.env.PGDATABASE || "userdb",
        }
);
