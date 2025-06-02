import express from "express";
import { getManager, updateManager } from "../controllers/ManagerControllers";
import { createManager } from "../controllers/ManagerControllers";
const router = express.Router();

router.get("/:cognitoId", getManager)
router.post("/", createManager);
router.put("/:cognitoId", updateManager)


export default router;