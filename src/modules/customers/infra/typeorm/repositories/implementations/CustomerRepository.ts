import { getRepository, Repository } from "typeorm";

import { AppError } from "../../../../../../shared/errors/AppError";
import { ICreateCustumerDTO } from "../../../../dtos/ICreateCustomer.dto";
import { ICustomerRepository } from "../../../../repositories/ICustumerRepository";
import { Customer } from "../../entities/Custumer";

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
}

export { CustumerRepository };
