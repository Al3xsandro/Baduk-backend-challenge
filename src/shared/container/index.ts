import { container } from "tsyringe";

import { CustumerRepository } from "../../modules/customers/infra/typeorm/repositories/implementations/CustomerRepository";
import { ICustomerRepository } from "../../modules/customers/repositories/ICustumerRepository";

container.registerSingleton<ICustomerRepository>(
  "CustomerRepository",
  CustumerRepository
);
