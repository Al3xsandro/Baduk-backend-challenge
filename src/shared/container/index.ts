import { container } from "tsyringe";

import { OrdersRepository } from "@modules/orders/infra/typeorm/repositories/implementations/OrdersRepository";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import { ProductsRepository } from "@modules/products/infra/typeorm/repositories/implementations/ProductsRepository";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";

import { CustomerRepository } from "../../modules/customers/infra/typeorm/repositories/implementations/CustomerRepository";
import { ICustomerRepository } from "../../modules/customers/repositories/ICustomerRepository";

container.registerSingleton<ICustomerRepository>(
  "CustomerRepository",
  CustomerRepository
);

container.registerSingleton<IProductsRepository>(
  "ProductsRepository",
  ProductsRepository
);

container.registerSingleton<IOrdersRepository>(
  "OrdersRepository",
  OrdersRepository
);
