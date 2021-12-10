import { ICreateCustumerDTO } from "../dtos/ICreateCustomer.dto";
import { Customer } from "../infra/typeorm/entities/Custumer";

interface ICustomerRepository {
  create({ email, telefone }: ICreateCustumerDTO): Promise<Customer>;
  find(): Promise<Customer[]>;
  findByEmail(email: string): Promise<Customer>;
}

export { ICustomerRepository };
