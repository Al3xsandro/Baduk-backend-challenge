import { ICreateCustomerDTO } from "../../../dtos/ICreateCustomer.dto";
import { Customer } from "../../../infra/typeorm/entities/Customer";
import { ICustomerRepository } from "../../ICustomerRepository";

class CustomerRepositoryInMemory implements ICustomerRepository {
  constructor(private customerRepository: Customer[] = []) {}

  async create({
    name,
    email,
    telefone,
  }: ICreateCustomerDTO): Promise<Customer> {
    const customer = new Customer();

    Object.assign(customer, {
      name,
      email,
      telefone,
    });

    this.customerRepository.push(customer);

    return customer;
  }

  async find(): Promise<Customer[]> {
    const customers = this.customerRepository;

    return customers;
  }

  async findByEmail(email: string): Promise<Customer> {
    const customer = this.customerRepository.find(
      (customer) => customer.email === email
    );

    return customer;
  }

  async findById(id: string): Promise<Customer> {
    const customer = this.customerRepository.find(
      (customer) => customer.id === id
    );

    return customer;
  }
}

export { CustomerRepositoryInMemory };
