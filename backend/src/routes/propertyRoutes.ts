import express from "express";
import { generateUploadUrls, getProperties, getProperty } from "../controllers/PropertyControllers";
import { authMiddleware } from "../middleware/authMiddleware";
import multer from "multer";
import { createProperty } from "../controllers/PropertyControllers";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", getProperties);

router.get("/:id", getProperty);
router.post('/upload-urls',authMiddleware(['manager']), generateUploadUrls);
router.post(
  "/",
  authMiddleware(["manager"]),
  //upload.array("photos"),
  createProperty
);
export default router;
