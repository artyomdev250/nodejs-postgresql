import { Router } from "express";
import { getAllProjects } from "../controllers/projects/getAllProjects.js";
import { getProjectsByUser } from "../controllers/projects/getProjectsByUser.js";
import { createProjectForUser } from "../controllers/projects/createProjectForUser.js";
import { updateProjectOfUser } from "../controllers/projects/updateProjectOfUser.js";
import { deleteProjectOfUser } from "../controllers/projects/deleteProjectOfUser.js";
import { getProjectByUserAndId } from "../controllers/projects/getProjectByUserAndId.js";

const router = Router();

router.get("/projects", getAllProjects);

router.get("/users/:userId/projects", getProjectsByUser);
router.get("/users/:userId/projects/:projectId", getProjectByUserAndId);
router.post("/users/:userId/projects", createProjectForUser);
router.put("/users/:userId/projects/:projectId", updateProjectOfUser);
router.delete("/users/:userId/projects/:projectId", deleteProjectOfUser);

export default router;
