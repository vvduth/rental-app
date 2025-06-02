import express from "express";
import { getProperties, getProperty } from "../controllers/PropertyControllers";
import { authMiddleware } from "../middleware/authMiddleware";
import multer from "multer";
import { createProperty } from "../controllers/PropertyControllers";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", getProperties);
router.post(
  "/",
  authMiddleware(["manager"]),
  upload.array("photos"),
  createProperty
);
router.get("/:id", getProperty);

export default router;
