import { Router } from "express";
import { verifyUser } from "../../middleware/user.middlewares";
import { createrepel } from "../../controllers/create/repel.controller";

const router = Router();

router.route("/").post(verifyUser, createrepel);

export default router;
