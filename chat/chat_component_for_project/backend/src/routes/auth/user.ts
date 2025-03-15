import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  changePassword,
  getUsers,
} from "../../controllers/auth/user.controller";
import { Router } from "express";
import { verifyUser } from "../../middleware/user.middlewares";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/currentUser").get(verifyUser, getCurrentUser);
router.route("/logout").post(verifyUser, logoutUser);
router.route("/changePassword").post(verifyUser, changePassword);

router.route("/all").get(verifyUser, getUsers);

//TODO: This route will not work for now
// router.route("/resetpassword").post(verifyUser, resetPassword);

export default router;
