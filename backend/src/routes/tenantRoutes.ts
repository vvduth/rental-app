import express from "express";
import { addFavoriteProperty, getTenant, getTenantProperties, removeFavoriteProperty } from "../controllers/tenantControllers";
import { createTenant,updateTentant  } from "../controllers/tenantControllers";
const router = express.Router();

router.get("/:cognitoId", getTenant)
router.put("/:cognitoId", updateTentant)
router.get("/:cognitoId/properties", getTenantProperties);
router.post("/", createTenant);
router.post("/:cognitoId/favorites/:propertyId", addFavoriteProperty)
router.delete("/:cognitoId/favorites/:propertyId", removeFavoriteProperty)

export default router;