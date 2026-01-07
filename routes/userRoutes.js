import { Router } from "express";
import { createUser } from "../controllers/users/createUser.js";
import { getUsers } from "../controllers/users/getUsers.js";
import { getUserById } from "../controllers/users/getUserById.js";
import { updateUser } from "../controllers/users/updateUser.js";
import { deleteUser } from "../controllers/users/deleteUser.js";

const router = Router();

router.post("/users", createUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
