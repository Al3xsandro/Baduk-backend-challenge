import { ICreateCustomerDTO } from "../dtos/ICreateCustomer.dto";
import { Customer } from "../infra/typeorm/entities/Customer";

interface ICustomerRepository {
  create({ name, email, telefone }: ICreateCustomerDTO): Promise<Customer>;
  find(): Promise<Customer[]>;
  findByEmail(email: string): Promise<Customer>;
  findById(id: string): Promise<Customer>;
}

export { ICustomerRepository };
