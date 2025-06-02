import express from "express";
import { getTenant } from "../controllers/tenantControllers";
import { createTenant } from "../controllers/tenantControllers";
const router = express.Router();

router.get("/:cognitoId", getTenant)
router.post("/", createTenant);

export default router;