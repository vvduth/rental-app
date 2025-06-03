import express from "express";
import { getManager, getManagerProperties, updateManager } from "../controllers/ManagerControllers";
import { createManager } from "../controllers/ManagerControllers";
const router = express.Router();

router.get("/:cognitoId", getManager)
router.post("/", createManager);
router.put("/:cognitoId", updateManager)
router.get("/:cognitoId/properties", getManagerProperties);


export default router;