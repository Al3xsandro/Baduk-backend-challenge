import { getRepository, Repository } from "typeorm";

import { ICreateCustomerDTO } from "@modules/customers/dtos/ICreateCustomer.dto";
import { Customer } from "@modules/customers/infra/typeorm/entities/Customer";
import { ICustomerRepository } from "@modules/customers/repositories/ICustomerRepository";
import { AppError } from "@shared/errors/AppError";

class CustomerRepository implements ICustomerRepository {
  private repository: Repository<Customer>;

  constructor() {
    this.repository = getRepository(Customer);
  }

  async create({
    name,
    email,
    telefone,
  }: ICreateCustomerDTO): Promise<Customer> {
    const customer = this.repository.create({
      name,
      email,
      telefone,
    });

    await this.repository.save(customer);

    return customer;
  }
  async find(): Promise<Customer[]> {
    const customers = await this.repository.find();

    if (!customers) {
      throw new AppError("An error was occurred!");
    }

    return customers;
  }

  async findByEmail(email: string): Promise<Customer> {
    const customer = await this.repository.findOne({
      where: {
        email,
      },
    });

    return customer;
  }

  async findById(id: string): Promise<Customer> {
    const customer = await this.repository.findOne({
      id,
    });

    return customer;
  }
}

export { CustomerRepository };
