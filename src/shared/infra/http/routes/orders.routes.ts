import { Router } from "express";

import { CreateOrderController } from "@modules/orders/useCases/createOrder/CreateOrderController";
import { FindOrdersController } from "@modules/orders/useCases/findOrders/FindOrdersController";

const ordersRoutes = Router();

const createOrderController = new CreateOrderController();
const findOrdersController = new FindOrdersController();

ordersRoutes.post("/orders", createOrderController.handle);
ordersRoutes.get("/orders", findOrdersController.handle);

export { ordersRoutes };
