import { getRepository, Repository } from "typeorm";

import { ICreateCustumerDTO } from "@modules/customers/dtos/ICreateCustomer.dto";
import { Customer } from "@modules/customers/infra/typeorm/entities/Custumer";
import { ICustomerRepository } from "@modules/customers/repositories/ICustumerRepository";
import { AppError } from "@shared/errors/AppError";

class CustumerRepository implements ICustomerRepository {
  private repostory: Repository<Customer>;

  constructor() {
    this.repostory = getRepository(Customer);
  }

  async create({
    name,
    email,
    telefone,
  }: ICreateCustumerDTO): Promise<Customer> {
    const customer = this.repostory.create({
      name,
      email,
      telefone,
    });

    await this.repostory.save(customer);

    return customer;
  }
  async find(): Promise<Customer[]> {
    const customers = await this.repostory.find();

    if (!customers) {
      throw new AppError("An error was occurred!");
    }

    return customers;
  }

  async findByEmail(email: string): Promise<Customer> {
    const customer = await this.repostory.findOne({
      where: {
        email,
      },
    });

    return customer;
  }

  async findById(id: string): Promise<Customer> {
    const customer = await this.repostory.findOne({
      id,
    });

    return customer;
  }
}

export { CustumerRepository };
