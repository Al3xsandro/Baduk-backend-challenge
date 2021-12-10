import { Router } from "express";

import { customerRoutes } from "./customers.routes";

const router = Router();

router.use(customerRoutes);

export { router };