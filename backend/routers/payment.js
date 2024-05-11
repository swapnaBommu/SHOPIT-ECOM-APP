import express from "express";
const router = express.Router();

import { isAuthentictedUser } from "../middlewares/auth.js";
import {
  stripeCheckoutSession,
  stripeWebhook,
} from "../controllers/paymentControllers.js";

router
  .route("/payment/checkout_session")
  .post(isAuthentictedUser, stripeCheckoutSession);

router.route("/payment/webhook").post(stripeWebhook);
export default router;