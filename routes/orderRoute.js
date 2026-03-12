import express from "express";
import { placeOrder, getOrders, updateOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/place-order", placeOrder);
router.get("/orders", getOrders);
router.put("/orders/:id", updateOrder);

export default router;