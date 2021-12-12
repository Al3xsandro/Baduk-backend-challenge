import { Router } from "express";

import { customerRoutes } from "./customers.routes";
import { productsRoutes } from "./products.routes";

const router = Router();

router.use(customerRoutes);
router.use(productsRoutes);

export { router };
