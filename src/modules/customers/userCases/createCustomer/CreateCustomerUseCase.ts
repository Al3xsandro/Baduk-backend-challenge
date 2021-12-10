import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateCustumerDTO } from "../../dtos/ICreateCustomer.dto";
import { ICustomerRepository } from "../../repositories/ICustumerRepository";

@injectable()
class CreateCustomerUseCase {
  constructor(
    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository
  ) {}

  async execute({ name, telefone, email }: ICreateCustumerDTO) {
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
