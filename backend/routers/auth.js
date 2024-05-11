import express from "express";
import { registerUser,loginUser, logout, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile, allUsers, getUserDetails, updateUser, deleteUser, uploadAvatar } from "../controllers/authControllers.js";
import { isAuthentictedUser,authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

// localhost:4000/api/v1/register
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthentictedUser,updatePassword);

router.route("/me").get(isAuthentictedUser, getUserProfile);
router.route("/me/update").put(isAuthentictedUser, updateProfile);
router.route("/me/upload_avatar").put(isAuthentictedUser, uploadAvatar);

router.route("/admin/users").get(isAuthentictedUser,authorizeRoles("admin"),allUsers);
router.route("/admin/users/:id")
    .get(isAuthentictedUser,authorizeRoles("admin"),getUserDetails)
    .put(isAuthentictedUser,authorizeRoles("admin"),updateUser)
    .delete(isAuthentictedUser,authorizeRoles("admin"),deleteUser);



export default router;