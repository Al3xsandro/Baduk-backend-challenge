import { inject, injectable } from "tsyringe";

import { ICreateCustomerDTO } from "@modules/customers/dtos/ICreateCustomer.dto";
import { ICustomerRepository } from "@modules/customers/repositories/ICustumerRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateCustomerUseCase {
  constructor(
    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository
  ) {}

  async execute({ name, telefone, email }: ICreateCustomerDTO) {
    const customerAlreadyExists = await this.customerRepository.findByEmail(
      email
    );

    if (customerAlreadyExists) {
      throw new AppError("Customer already exists!");
    }

    const customer = await this.customerRepository.create({
      name,
      email,
      telefone,
    });

    return customer;
  }
}

export { CreateCustomerUseCase };
