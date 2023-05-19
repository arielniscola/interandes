import { Router } from "express";
import { clientRoutes } from "./client";
import { userRoutes } from "./user";
import { pricingRoutes } from "./pricing";

const router = Router();

router.use("/users", userRoutes);
router.use("/clients", clientRoutes);
router.use("/pricing", pricingRoutes);

export default router;
