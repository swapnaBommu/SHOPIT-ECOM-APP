import express from "express";
import { allorders, deleteOrder, getOrderDetails, getSales, myorders, newOrder, updateOrder } from "../controllers/orderControllers.js";
import { isAuthentictedUser,authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();


router.route("/orders/new").post(isAuthentictedUser,newOrder);
router.route("/orders/:id").get(isAuthentictedUser,getOrderDetails);
router.route("/me/orders").get(isAuthentictedUser,myorders);

router.route("/admin/orders")
        .get(isAuthentictedUser,authorizeRoles("admin"),allorders);

router.route("/admin/orders/:id")
.put(isAuthentictedUser,authorizeRoles("admin"),updateOrder)
.delete(isAuthentictedUser,authorizeRoles("admin"),deleteOrder);

router.route("/admin/get_sales")
        .get(isAuthentictedUser,authorizeRoles("admin"),getSales);

export default router;