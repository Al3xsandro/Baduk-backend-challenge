import { inject, injectable } from "tsyringe";

import { ICustomerRepository } from "../../repositories/ICustumerRepository";

@injectable()
class FindAllCustomersUseCase {
  constructor(
    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository
  ) {}

  async execute() {
    const customers = await this.customerRepository.find();

    return customers;
  }
}

export { FindAllCustomersUseCase };
