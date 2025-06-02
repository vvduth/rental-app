import express from "express";
import { getManager } from "../controllers/ManagerControllers";
import { createManager } from "../controllers/ManagerControllers";
const router = express.Router();

router.get("/:cognitoId", getManager)
router.post("/", createManager);

export default router;