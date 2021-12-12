import { Router } from "express";

import { CreateCustomerController } from "@modules/customers/userCases/createCustomer/CreateCustomerController";
import { FindAllCustomersController } from "@modules/customers/userCases/findAllCustomers/FindAllCustomersController";

const customerRoutes = Router();

const createCustomerController = new CreateCustomerController();
const findAllCustomersController = new FindAllCustomersController();

customerRoutes.post("/customers", createCustomerController.handle);
customerRoutes.get("/customers", findAllCustomersController.handle);

export { customerRoutes };
