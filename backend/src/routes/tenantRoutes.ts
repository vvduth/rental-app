import express from "express";
import { getTenant } from "../controllers/tenantControllers";
import { createTenant,updateTentant  } from "../controllers/tenantControllers";
const router = express.Router();

router.get("/:cognitoId", getTenant)
router.put("/:cognitoId", updateTentant)

router.post("/", createTenant);

export default router;