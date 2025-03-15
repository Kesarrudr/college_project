import { Router } from "express";
import {
  sendMessage,
  getMessages,
} from "../../controllers/chat/chat.controller";
import { verifyUser } from "../../middleware/user.middlewares";

const router = Router();

router.route("/send/:id").post(verifyUser, sendMessage);
router.route("/:id").get(verifyUser, getMessages);

export default router;
