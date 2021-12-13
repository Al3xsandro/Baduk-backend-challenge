import { Router } from "express";

import { customerRoutes } from "./customers.routes";
import { ordersRoutes } from "./orders.routes";
import { productsRoutes } from "./products.routes";

const router = Router();

router.use(customerRoutes);
router.use(productsRoutes);
router.use(ordersRoutes);

export { router };
