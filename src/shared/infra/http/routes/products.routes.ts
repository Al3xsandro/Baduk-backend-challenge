import { Router } from "express";

import { CreateProductController } from "@modules/products/useCases/CreateProduct/CreateProductController";
import { FindProductsController } from "@modules/products/useCases/findProducts/FindProductsController";

const productsRoutes = Router();

const createProductController = new CreateProductController();
const findProductsController = new FindProductsController();

productsRoutes.post("/products", createProductController.handle);
productsRoutes.get("/products", findProductsController.handle);

export { productsRoutes };
