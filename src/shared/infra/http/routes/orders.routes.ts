import { Router } from "express";

import { CreateOrderController } from "@modules/orders/useCases/createOrder/CreateOrderController";

const ordersRoutes = Router();

const createOrderController = new CreateOrderController();

ordersRoutes.post("/orders", createOrderController.handle);

export { ordersRoutes };
