import { ICreateCustumerDTO } from "../../../dtos/ICreateCustomer.dto";
import { Customer } from "../../../infra/typeorm/entities/Custumer";
import { ICustomerRepository } from "../../ICustumerRepository";

class CustomerRepositoryInMemory implements ICustomerRepository {
  constructor(private custumerRepository: Customer[] = []) {}

  async create({
    name,
    email,
    telefone,
  }: ICreateCustumerDTO): Promise<Customer> {
    const customer = new Customer();

    Object.assign(customer, {
      name,
      email,
      telefone,
    });

    this.custumerRepository.push(customer);

    return customer;
  }

  async find(): Promise<Customer[]> {
    const customers = this.custumerRepository;

    return customers;
  }

  async findByEmail(email: string): Promise<Customer> {
    const customer = this.custumerRepository.find(
      (custumer) => custumer.email === email
    );

    return customer;
  }

  async findById(id: string): Promise<Customer> {
    const customer = this.custumerRepository.find(
      (custumer) => custumer.id === id
    );

    return customer;
  }
}

export { CustomerRepositoryInMemory };
