import { ICreateOrderDTO } from "../dtos/ICreateOrderDTO";
import { Order } from "../infra/typeorm/entities/Order";

interface IOrdersRepository {
  create({ customerId, products }: ICreateOrderDTO): Promise<Order>;
  findByProductId(product_id: string): Promise<Order[]>;
  findByDate(first_date: Date, last_date: Date): Promise<Order[]>;
  findByUpPrice(price: string): Promise<Order[]>;
  findByBelowPrice(price: string): Promise<Order[]>;
}

export { IOrdersRepository };
