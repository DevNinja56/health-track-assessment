import { Router } from "express";
import { assignUserRole, fetchUserRole } from "../controllers/userController";

const router = Router();

// Define the routes for the user
router.post("/assignRole", assignUserRole);
router.post("/role", fetchUserRole);

export default router;
