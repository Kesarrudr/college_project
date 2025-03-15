import { Router } from "express";
import { healthCheck } from "../health_check";

const router = Router();

router.route("/").get(healthCheck);

export default router;
